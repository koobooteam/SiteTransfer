import { Context, IPage } from "../models/Context";
import appsettings from "../../src/appsettings";
import puppeteer, { Page } from "puppeteer";
import { listenerCount } from "process";
import { appendFile, readdirSync } from "fs";
import { countReset } from "console";
import { generateKeyPair } from "crypto";



export async function ApplyElementResult(context: Context) {

    var result = [] as ElementResult[];

    for (var page of context.pages) {
        var item = await page.value.evaluate(GetElementResult);
        SetPageKey(item, page); 
        result.push(item);  
    } 
    context.elResults = result; 
    function SetPageKey(el: ElementResult, page: IPage)
    {
        el.pagekey = page.path; 
        if (el.Children !=null)
        { 
            el.Children.forEach(element => {
                SetPageKey(element, page); 
            }); 
        }
    }
}

export async function GroupBy(context: Context) : Promise<GroupedElement> {

    await ApplyElementResult(context);

    var root = {} as GroupedElement;

    // first root always start with HTML. 
    var root = {} as GroupedElement; 
    root.children  = []; 
 
     
    //html.elements = context.elResults; 
    
    context.elResults.forEach(el => {
         AppendElement(root, el); 
     });

     return root; 

   function AppendElement(Parent: GroupedElement, el: ElementResult)
    { 
        var found = false; 
        for (const it of Parent.children) {

            if (CheckSimilar(it, el))
            {
                it.elements.push(el); 
                AppendSub(it, el); 
                found = true;  
                break;
            }  
        }

        if (!found)
        {
            var newitem = Generate(el); 
            Parent.children.push(newitem); 
            newitem.children = [];  
            AppendSub(newitem, el); 
        } 
    }

    // g is the copy generated of el. 
    function AppendSub(g: GroupedElement, el: ElementResult)
    {
        el.Children.forEach(element => {
            AppendElement(g, element); 
        });
    }

    function Generate(el: ElementResult): GroupedElement
    {
        var result = {} as GroupedElement; 
        result.id = el.id; 
        result.tagName = el.tagName; 
        result.class = el.class; 
        result.rect = el.rect; 
        result.top = el.rect.top; 
        result.left = el.rect.left; 

        result.elements = []; 
        result.elements.push(el); 
        return result; 
    }

    function CheckSimilar(g: GroupedElement, e: ElementResult): boolean
    {
        if (g.tagName != e.tagName)
        {
            return false; 
        }

        if (!SameString(e.id, g.id))
        {
            return false; 
        }
        
        if (!SameString(g.cssposition, e.style.position))
        {
            return false; 
        }

        if (Math.abs(g.top - e.rect.top )> 10)
        {
            return false; 
        }

        if (Math.abs(g.left - e.rect.left)>10)
        {
            return false; 
        }
  
        return true; 
    }


    function SameString(A: string, B: string): boolean
    {
        if (A || B)
        {
            return A == B; 
        }
        else
        {
            if (!A && !B)
            {
                return true; 
            }
            return false; 
        }
    }
}




export function IsSimiliar(A: ElementResult, B: ElementResult): boolean {
    if (A.id != B.id) {
        return false;
    }

    if (A.tagName != B.tagName) {
        return false;
    }

    if (!SimilarRect(A.rect, B.rect)) {
        return false;
    } 

    if (A.style.position && B.style.position && A.style.position != B.style.position)
    {
        return false;
    }

    return true;
}

// check whether this is similiar elements or not.... 
export function SimilarRect(a: RectPosition, b: RectPosition): boolean {
    if (Math.abs(a.width - b.width) > 10) {
        return false;
    }

    if (Math.abs(a.top - b.top) > 10) {
        return false;
    }

    // TODO: some websites are right to left...
    if (Math.abs(a.left - b.left) > 10) {
        return false;
    }

    return true;
}

export interface UsefulStyle {
    fontSize: string;
    position: string;
    display: string;
    left: string;
    right: string;
    bottom: string;
    top: string;
    zIndex: string;
    width: string;
    height: string;

    // below are shorthands.
    border: string;
    background: string;
    column: string;
    text: string;
    margin: string;
    padding: string;
    grid: string;
    overflow: string;

}

export interface RectPosition {
    top: number;
    bottom: number;
    left: number;
    right: number;
    heigth: number;
    width: number;
    x: number;
    y: number;

}

export interface ElementResult {
    style: UsefulStyle;
    rect: RectPosition;
    id: string;
    tagName: string;
    class: string;
    koobooid: string;
    result: string;
    Children: ElementResult[];
    pagekey: string;   // name or path of the page. to identify the page back. 
}

export interface GroupedElement { 
    rect: RectPosition;  
    id: string; 
    tagName: string; 
    class: string; 
    cssposition: string; 
    top: number; 
    left: number; 
    elements: ElementResult[]; 
    children: GroupedElement[];
}

export function GetElementResult(): ElementResult {

    var root = document.documentElement;
    var mydoc = ConvertToElementResult(root);
    return mydoc;

    /* repeating block */

    function ConvertToElementResult(el: Element): ElementResult {
        var obj = {} as ElementResult;

        if (!el || !el.tagName) {
            return obj;
        }

        obj.id = el.id;
        obj.tagName = el.tagName;
        obj.class = el.className;
        obj.style = getStyle(el);

        obj.koobooid = GetKoobooId(el);

        var rect = el.getBoundingClientRect();
        obj.rect = {} as RectPosition;
        obj.rect.top = rect.top;
        obj.rect.bottom = rect.bottom;
        obj.rect.heigth = rect.height;
        obj.rect.width = rect.width;
        obj.rect.x = rect.x;
        obj.rect.y = rect.y;
        obj.rect.left = rect.left;
        obj.rect.right = rect.right;

        // set sub elements. 
        if (el.children && el.children.length > 0) {
            obj.Children = [];

            var child = Array.from(el.children);

            child.forEach(function (item) {

                var sub = {} as ElementResult;
                var sub = ConvertToElementResult(item);
                obj.Children.push(sub);
            }
            );

        };

        return obj;

    };


    function getStyle(el: Element) {
        var result = {} as UsefulStyle;

        var style = window.getComputedStyle(el);

        // set important..
        // fontSize: string;
        // position:string;
        // display:string; 
        // left: string;
        // right:string;
        // bottom:string;
        // top: string;
        // zIndex:string;
        // width: string; 
        // height: string; 

        result.fontSize = style.fontSize;
        result.position = style.position;
        result.display = style.display;
        result.left = style.left;
        result.right = style.right;
        result.bottom = style.bottom;
        result.top = style.top;
        result.zIndex = style.zIndex;
        result.height = style.height;
        result.width = style.width;


        // border: string;
        // background: string; 
        // column: string; 
        // text:string;
        // margin: string;
        // padding: string;
        // grid: string; 
        // overflow: string;  
        var border: string = "";
        var background: string = "";
        var text: string = "";
        var column: string = "";
        var margin: string = "";
        var padding: string = "";
        var grid: string = "";
        var overflow: string = "";


        for (var propertyName in style) {
            if (propertyName.indexOf("border") > -1) {
                border += style[propertyName];
            }
        }

        result.border = border;

        for (var propertyName in style) {
            if (propertyName.indexOf("background") > -1) {
                background += style[propertyName];
            }
        }

        result.background = background;


        for (var propertyName in style) {
            if (propertyName.indexOf("text") > -1) {
                text += style[propertyName];
            }
        }

        result.text = text;


        for (var propertyName in style) {
            if (propertyName.indexOf("column") > -1) {
                column += style[propertyName];
            }
        }

        result.column = column;


        for (var propertyName in style) {
            if (propertyName.indexOf("margin") > -1) {
                margin += style[propertyName];
            }
        }
        result.margin = margin;

        for (var propertyName in style) {
            if (propertyName.indexOf("padding") > -1) {
                padding += style[propertyName];
            }
        }
        result.padding = padding;

        for (var propertyName in style) {
            if (propertyName.indexOf("grid") > -1) {
                grid += style[propertyName];
            }
        }
        result.grid = grid;

        for (var propertyName in style) {
            if (propertyName.indexOf("overflow") > -1) {
                overflow += style[propertyName];
            }
        }
        result.overflow = overflow;


        return result;

    };

    function GetKoobooId(el: Element) {

        if (el == null) {
            return "null";
        }
        var list: number[] = [];
        list.push(siblingIndex(el));

        var parent = el.parentElement;

        while (parent != null && parent.parentElement != null) {
            list.push(siblingIndex(parent));
            parent = parent.parentElement;
        }

        list.reverse();

        return intToString(list);

        function siblingIndex(el: Element): number {
            var counter: number = 0;
            var next = el.previousSibling;

            while (next != null) {
                counter += 1;
                next = next.previousSibling;
            }
            return counter;
        }

        function intToString(IntList: number[]) {
            return IntList.join("-");
        }

    }

    /* end of repeating block */
}


function ConvertToElementResult(el: Element): ElementResult {
    var obj = {} as ElementResult;

    if (!el || !el.tagName) {
        return obj;
    }

    obj.id = el.id;
    obj.tagName = el.tagName;
    obj.class = el.className;
    obj.style = getStyle(el);

    obj.koobooid = GetKoobooId(el);

    var rect = el.getBoundingClientRect();
    obj.rect = {} as RectPosition;
    obj.rect.top = rect.top;
    obj.rect.bottom = rect.bottom;
    obj.rect.heigth = rect.height;
    obj.rect.width = rect.width;
    obj.rect.x = rect.x;
    obj.rect.y = rect.y;
    obj.rect.left = rect.left;
    obj.rect.right = rect.right;

    // set sub elements. 
    if (el.children && el.children.length > 0) {
        obj.Children = [];

        var child = Array.from(el.children);

        child.forEach(function (item) {

            var sub = {} as ElementResult;
            var sub = ConvertToElementResult(item);
            obj.Children.push(sub);
        }
        );

    };

    return obj;

};


function getStyle(el: Element) {
    var result = {} as UsefulStyle;

    var style = window.getComputedStyle(el);

    // set important..
    // fontSize: string;
    // position:string;
    // display:string; 
    // left: string;
    // right:string;
    // bottom:string;
    // top: string;
    // zIndex:string;
    // width: string; 
    // height: string; 

    result.fontSize = style.fontSize;
    result.position = style.position;
    result.display = style.display;
    result.left = style.left;
    result.right = style.right;
    result.bottom = style.bottom;
    result.top = style.top;
    result.zIndex = style.zIndex;
    result.height = style.height;
    result.width = style.width;


    // border: string;
    // background: string; 
    // column: string; 
    // text:string;
    // margin: string;
    // padding: string;
    // grid: string; 
    // overflow: string;  
    var border: string = "";
    var background: string = "";
    var text: string = "";
    var column: string = "";
    var margin: string = "";
    var padding: string = "";
    var grid: string = "";
    var overflow: string = "";


    for (var propertyName in style) {
        if (propertyName.indexOf("border") > -1) {
            border += style[propertyName];
        }
    }

    result.border = border;

    for (var propertyName in style) {
        if (propertyName.indexOf("background") > -1) {
            background += style[propertyName];
        }
    }

    result.background = background;


    for (var propertyName in style) {
        if (propertyName.indexOf("text") > -1) {
            text += style[propertyName];
        }
    }

    result.text = text;


    for (var propertyName in style) {
        if (propertyName.indexOf("column") > -1) {
            column += style[propertyName];
        }
    }

    result.column = column;


    for (var propertyName in style) {
        if (propertyName.indexOf("margin") > -1) {
            margin += style[propertyName];
        }
    }
    result.margin = margin;

    for (var propertyName in style) {
        if (propertyName.indexOf("padding") > -1) {
            padding += style[propertyName];
        }
    }
    result.padding = padding;

    for (var propertyName in style) {
        if (propertyName.indexOf("grid") > -1) {
            grid += style[propertyName];
        }
    }
    result.grid = grid;

    for (var propertyName in style) {
        if (propertyName.indexOf("overflow") > -1) {
            overflow += style[propertyName];
        }
    }
    result.overflow = overflow;


    return result;

};


export function GetKoobooId(el: Element) {

    if (el == null) {
        return "null";
    }
    var list: number[] = [];
    list.push(siblingIndex(el));

    var parent = el.parentElement;

    while (parent != null && parent.parentElement != null) {
        list.push(siblingIndex(parent));
        parent = parent.parentElement;
    }

    list.reverse();

    return intToString(list);

    function siblingIndex(el: Element): number {
        var counter: number = 0;
        var next = el.previousSibling;

        while (next != null) {
            counter += 1;
            next = next.previousSibling;
        }
        return counter;
    }

    function intToString(IntList: number[]) {
        return IntList.join("-");
    }

}


export function GetElementByKoobooId(KoobooId: string): ElementResult {

    var list = stringToNumberList(KoobooId);

    var el = document.documentElement as Element;

    list.forEach(
        function (index) {

            if (index > el.childNodes.length - 1) {
                return null;
            }
            else {
                // check if only count Element, not (textnode). 
                el = el.childNodes[index] as Element;

                if (el == null) {
                    return null;
                }
            }
        }
    );

    return ConvertToElementResult(el);

    function stringToNumberList(koobooid: string): number[] {
        var result: number[] = [];

        var parts = koobooid.split("-");

        parts.forEach(

            function (item) {
                var num = parseInt(item);
                result.push(num);
            }

        );
        return result;
    }


    /* repeating block   
    -----------------------*/


    function ConvertToElementResult(el: Element): ElementResult {
        var obj = {} as ElementResult;

        if (!el || !el.tagName) {
            return obj;
        }

        obj.id = el.id;
        obj.tagName = el.tagName;
        obj.class = el.className;
        obj.style = getStyle(el);

        obj.koobooid = GetKoobooId(el);

        var rect = el.getBoundingClientRect();
        obj.rect = {} as RectPosition;
        obj.rect.top = rect.top;
        obj.rect.bottom = rect.bottom;
        obj.rect.heigth = rect.height;
        obj.rect.width = rect.width;
        obj.rect.x = rect.x;
        obj.rect.y = rect.y;
        obj.rect.left = rect.left;
        obj.rect.right = rect.right;

        // set sub elements. 
        if (el.children && el.children.length > 0) {
            obj.Children = [];

            var child = Array.from(el.children);

            child.forEach(function (item) {

                var sub = {} as ElementResult;
                var sub = ConvertToElementResult(item);
                obj.Children.push(sub);
            }
            );

        };

        return obj;

    };


    function getStyle(el: Element) {
        var result = {} as UsefulStyle;

        var style = window.getComputedStyle(el);

        // set important..
        // fontSize: string;
        // position:string;
        // display:string; 
        // left: string;
        // right:string;
        // bottom:string;
        // top: string;
        // zIndex:string;
        // width: string; 
        // height: string; 

        result.fontSize = style.fontSize;
        result.position = style.position;
        result.display = style.display;
        result.left = style.left;
        result.right = style.right;
        result.bottom = style.bottom;
        result.top = style.top;
        result.zIndex = style.zIndex;
        result.height = style.height;
        result.width = style.width;


        // border: string;
        // background: string; 
        // column: string; 
        // text:string;
        // margin: string;
        // padding: string;
        // grid: string; 
        // overflow: string;  
        var border: string = "";
        var background: string = "";
        var text: string = "";
        var column: string = "";
        var margin: string = "";
        var padding: string = "";
        var grid: string = "";
        var overflow: string = "";


        for (var propertyName in style) {
            if (propertyName.indexOf("border") > -1) {
                border += style[propertyName];
            }
        }

        result.border = border;

        for (var propertyName in style) {
            if (propertyName.indexOf("background") > -1) {
                background += style[propertyName];
            }
        }

        result.background = background;


        for (var propertyName in style) {
            if (propertyName.indexOf("text") > -1) {
                text += style[propertyName];
            }
        }

        result.text = text;


        for (var propertyName in style) {
            if (propertyName.indexOf("column") > -1) {
                column += style[propertyName];
            }
        }

        result.column = column;


        for (var propertyName in style) {
            if (propertyName.indexOf("margin") > -1) {
                margin += style[propertyName];
            }
        }
        result.margin = margin;

        for (var propertyName in style) {
            if (propertyName.indexOf("padding") > -1) {
                padding += style[propertyName];
            }
        }
        result.padding = padding;

        for (var propertyName in style) {
            if (propertyName.indexOf("grid") > -1) {
                grid += style[propertyName];
            }
        }
        result.grid = grid;

        for (var propertyName in style) {
            if (propertyName.indexOf("overflow") > -1) {
                overflow += style[propertyName];
            }
        }
        result.overflow = overflow;


        return result;

    };


    function GetKoobooId(el: Element) {

        if (el == null) {
            return "null";
        }
        var list: number[] = [];
        list.push(siblingIndex(el));

        var parent = el.parentElement;

        while (parent != null && parent.parentElement != null) {
            list.push(siblingIndex(parent));
            parent = parent.parentElement;
        }

        list.reverse();

        return intToString(list);

        function siblingIndex(el: Element): number {
            var counter: number = 0;
            var next = el.previousSibling;

            while (next != null) {
                counter += 1;
                next = next.previousSibling;
            }
            return counter;
        }

        function intToString(IntList: number[]) {
            return IntList.join("-");
        }

    }


    /* end repeating */


}
