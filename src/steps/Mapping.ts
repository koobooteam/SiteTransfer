import { Context } from "../models/Context";
import appsettings from "../../src/appsettings";
import puppeteer from "puppeteer";



export function MapElement(context: Context) {

    context.pages[0].value.evaluate(() => {

        var el = document.body.children[1];

        // var el.getBoundingClientRect[]; 

        var style = window.getComputedStyle(el);



    })


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

    //alignContent: string;
    //alignItems: string;
    //alignSelf: string;
    //alignmentBaseline: string;
    //all: string;
    // animation: string;
    // animationDelay: string;
    // animationDirection: string;
    // animationDuration: string;
    // animationFillMode: string;
    // animationIterationCount: string;
    // animationName: string;
    // animationPlayState: string;
    // animationTimingFunction: string;
    // backfaceVisibility: string;
    // background: string; 
    // backgroundAttachment: string;
    // backgroundClip: string;
    // backgroundColor: string;
    // backgroundImage: string;
    // backgroundOrigin: string;
    // backgroundPosition: string;
    // backgroundPositionX: string;
    // backgroundPositionY: string;
    // backgroundRepeat: string;
    // backgroundSize: string;
    // baselineShift: string;
    // blockSize: string;
    // border: string;
    // borderBlockEnd: string;
    // borderBlockEndColor: string;
    // borderBlockEndStyle: string;
    // borderBlockEndWidth: string;
    // borderBlockStart: string;
    // borderBlockStartColor: string;
    // borderBlockStartStyle: string;
    // borderBlockStartWidth: string;
    // borderBottom: string;
    // borderBottomColor: string;
    // borderBottomLeftRadius: string;
    // borderBottomRightRadius: string;
    // borderBottomStyle: string;
    // borderBottomWidth: string;
    // borderCollapse: string;
    // borderColor: string;
    // borderImage: string;
    // borderImageOutset: string;
    // borderImageRepeat: string;
    // borderImageSlice: string;
    // borderImageSource: string;
    // borderImageWidth: string;
    // borderInlineEnd: string;
    // borderInlineEndColor: string;
    // borderInlineEndStyle: string;
    // borderInlineEndWidth: string;
    // borderInlineStart: string;
    // borderInlineStartColor: string;
    // borderInlineStartStyle: string;
    // borderInlineStartWidth: string;
    // borderLeft: string;
    // borderLeftColor: string;
    // borderLeftStyle: string;
    // borderLeftWidth: string;
    // borderRadius: string;
    // borderRight: string;
    // borderRightColor: string;
    // borderRightStyle: string;
    // borderRightWidth: string;
    // borderSpacing: string;
    // borderStyle: string;
    // borderTop: string;
    // borderTopColor: string;
    // borderTopLeftRadius: string;
    // borderTopRightRadius: string;
    // borderTopStyle: string;
    // borderTopWidth: string;
    // borderWidth: string;
    // bottom: string;
    // boxShadow: string;
    // boxSizing: string;
    // breakAfter: string;
    // breakBefore: string;
    // breakInside: string;
    // captionSide: string;
    // caretColor: string;
    // clear: string;
    // clip: string;
    // clipPath: string;
    // clipRule: string;
    // color: string;
    // colorInterpolation: string;
    // colorInterpolationFilters: string;
    // columnCount: string;
    // columnFill: string;
    // columnGap: string;
    // columnRule: string;
    // columnRuleColor: string;
    // columnRuleStyle: string;
    // columnRuleWidth: string;
    // columnSpan: string;
    // columnWidth: string;
    // columns: string;
    // content: string;
    // counterIncrement: string;
    // counterReset: string;
    // cssFloat: string;
    // cssText: string;
    // cursor: string;
    // direction: string;
    // //display: string;
    // dominantBaseline: string;
    // emptyCells: string;
    // fill: string;
    // fillOpacity: string;
    // fillRule: string;
    // filter: string;
    // flex: string;
    // flexBasis: string;
    // flexDirection: string;
    // flexFlow: string;
    // flexGrow: string;
    // flexShrink: string;
    // flexWrap: string;
    // float: string;
    // floodColor: string;
    // floodOpacity: string;
    // font: string;
    // fontFamily: string;
    // fontFeatureSettings: string;
    // fontKerning: string;
    // fontSize: string;
    // fontSizeAdjust: string;
    // fontStretch: string;
    // fontStyle: string;
    // fontSynthesis: string;
    // fontVariant: string;
    // fontVariantCaps: string;
    // fontVariantEastAsian: string;
    // fontVariantLigatures: string;
    // fontVariantNumeric: string;
    // fontVariantPosition: string;
    // fontWeight: string;
    // gap: string;
    // glyphOrientationVertical: string;
    // grid: string;
    // gridArea: string;
    // gridAutoColumns: string;
    // gridAutoFlow: string;
    // gridAutoRows: string;
    // gridColumn: string;
    // gridColumnEnd: string;
    // gridColumnGap: string;
    // gridColumnStart: string;
    // gridGap: string;
    // gridRow: string;
    // gridRowEnd: string;
    // gridRowGap: string;
    // gridRowStart: string;
    // gridTemplate: string;
    // gridTemplateAreas: string;
    // gridTemplateColumns: string;
    // gridTemplateRows: string;
    //height: string;
    //     hyphens: string;
    //     imageOrientation: string;
    //     imageRendering: string;
    //     inlineSize: string;
    //     justifyContent: string;
    //     justifyItems: string;
    //     justifySelf: string;
    //     //left: string;
    //     readonly length: number;
    //     letterSpacing: string;
    //     lightingColor: string;
    //     lineBreak: string;
    //     lineHeight: string;
    //     listStyle: string;
    //     listStyleImage: string;
    //     listStylePosition: string;
    //     listStyleType: string;
    //     margin: string;
    //     marginBlockEnd: string;
    //     marginBlockStart: string;
    //     marginBottom: string;
    //     marginInlineEnd: string;
    //     marginInlineStart: string;
    //     marginLeft: string;
    //     marginRight: string;
    //     marginTop: string;
    //     marker: string;
    //     markerEnd: string;
    //     markerMid: string;
    //     markerStart: string;
    //     mask: string;
    //     maskComposite: string;
    //     maskImage: string;
    //     maskPosition: string;
    //     maskRepeat: string;
    //     maskSize: string;
    //     maskType: string;
    //     maxBlockSize: string;
    //     maxHeight: string;
    //     maxInlineSize: string;
    //     maxWidth: string;
    //     minBlockSize: string;
    //     minHeight: string;
    //     minInlineSize: string;
    //     minWidth: string;
    //     objectFit: string;
    //     objectPosition: string;
    //     opacity: string;
    //     order: string;
    //     orphans: string;
    //     outline: string;
    //     outlineColor: string;
    //     outlineOffset: string;
    //     outlineStyle: string;
    //     outlineWidth: string;
    //     overflow: string;
    //     overflowAnchor: string;
    //     overflowWrap: string;
    //     overflowX: string;
    //     overflowY: string;
    //     padding: string;
    //     paddingBlockEnd: string;
    //     paddingBlockStart: string;
    //     paddingBottom: string;
    //     paddingInlineEnd: string;
    //     paddingInlineStart: string;
    //     paddingLeft: string;
    //     paddingRight: string;
    //     paddingTop: string;
    //     pageBreakAfter: string;
    //     pageBreakBefore: string;
    //     pageBreakInside: string;
    //     paintOrder: string;
    //     readonly parentRule: CSSRule | null;
    //     perspective: string;
    //     perspectiveOrigin: string;
    //     placeContent: string;
    //     placeItems: string;
    //     placeSelf: string;
    //     pointerEvents: string;
    //     //position: string;
    //     quotes: string;
    //     resize: string;
    //     //right: string;
    //     rotate: string;
    //     rowGap: string;
    //     rubyAlign: string;
    //     rubyPosition: string;
    //     scale: string;
    //     scrollBehavior: string;
    //     shapeRendering: string;
    //     stopColor: string;
    //     stopOpacity: string;
    //     stroke: string;
    //     strokeDasharray: string;
    //     strokeDashoffset: string;
    //     strokeLinecap: string;
    //     strokeLinejoin: string;
    //     strokeMiterlimit: string;
    //     strokeOpacity: string;
    //     strokeWidth: string;
    //     tabSize: string;
    //     tableLayout: string;
    //     textAlign: string;
    //     textAlignLast: string;
    //     textAnchor: string;
    //     textCombineUpright: string;
    //     textDecoration: string;
    //     textDecorationColor: string;
    //     textDecorationLine: string;
    //     textDecorationStyle: string;
    //     textEmphasis: string;
    //     textEmphasisColor: string;
    //     textEmphasisPosition: string;
    //     textEmphasisStyle: string;
    //     textIndent: string;
    //     textJustify: string;
    //     textOrientation: string;
    //     textOverflow: string;
    //     textRendering: string;
    //     textShadow: string;
    //     textTransform: string;
    //     textUnderlinePosition: string;
    //     //top: string;
    //     touchAction: string;
    //     transform: string;
    //     transformBox: string;
    //     transformOrigin: string;
    //     transformStyle: string;
    //     transition: string;
    //     transitionDelay: string;
    //     transitionDuration: string;
    //     transitionProperty: string;
    //     transitionTimingFunction: string;
    //     translate: string;
    //     unicodeBidi: string;
    //     userSelect: string;
    //     verticalAlign: string;
    //     visibility: string; 
    //     webkitUserSelect: string;
    //     whiteSpace: string;
    //     widows: string;
    //    // width: string;
    //     willChange: string;
    //     wordBreak: string;
    //     wordSpacing: string;
    //     wordWrap: string;
    //     writingMode: string;
    //     //zIndex: string;
    //     /** @deprecated */
    //     zoom: string;
    //     getPropertyPriority(property: string): string;
    //     getPropertyValue(property: string): string;
    //     item(index: number): string;
    //     removeProperty(property: string): string;
    //     setProperty(property: string, value: string | null, priority?: string): void;
    //     [index: number]: string; 

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
    Rect: RectPosition;
    id: string;
    tagName: string;
    class: string;
    koobooid: string; 
    result: string;  
    Children: ElementResult[];
}

export interface GroupedElement {
    element: ElementResult;

    others: ElementResult[];

    pages: puppeteer.Page[];

}

export function GetElementResult(): ElementResult {
 
    var root = document.documentElement;

    var mydoc = ConvertToElementResult(root); 
    return mydoc; 


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
        obj.Rect = {} as RectPosition;
        obj.Rect.top = rect.top;
        obj.Rect.bottom = rect.bottom;
        obj.Rect.heigth = rect.height;
        obj.Rect.width = rect.width;
        obj.Rect.x = rect.x;
        obj.Rect.y = rect.y;
        obj.Rect.left = rect.left;
        obj.Rect.right = rect.right;
    
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

        if (el == null)
        {
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
    obj.Rect = {} as RectPosition;
    obj.Rect.top = rect.top;
    obj.Rect.bottom = rect.bottom;
    obj.Rect.heigth = rect.height;
    obj.Rect.width = rect.width;
    obj.Rect.x = rect.x;
    obj.Rect.y = rect.y;
    obj.Rect.left = rect.left;
    obj.Rect.right = rect.right;

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

    if (el == null)
    {
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


export function GetElementByKoobooId(htmlroot: Element, KoobooId: string): ElementResult {
    var list = stringToNumberList(KoobooId);

    var el = htmlroot;

    list.forEach(
        function (index) {

            if (index > el.children.length - 1) {
                return null;
            }
            else {
                // check if only count Element, not (textnode). 
                el = el.children[index];
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



}

