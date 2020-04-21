// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const target = document.body; 
const observer = new MutationObserver(function(mutations){
    mutations.forEach(item => {
        const element:HTMLElement = <HTMLElement>item.target;

        //Changed Colour 
        if(element.classList.contains('list-card-labels')){

            const labelNodes = element.querySelectorAll('span.card-label');
            console.log(labelNodes);
            // if(labelNode != null){
            //     const colour:string = window.getComputedStyle(labelNode).backgroundColor;
            //     const colourValue = getRGB(colour);
            
            //     // console.log(element.parentElement);
            //     (<HTMLElement>element.parentElement).style.backgroundColor = colour.replace('rgb','rgba').replace(')',',0.5)');;
            // }
            if(element.parentElement != null){
                updateCardColour(<HTMLElement>element.parentElement, labelNodes);
            }
        }

        //Initial or Created cards
        if(element.classList.contains('list-card')){            

                const labelNodes = element.querySelectorAll('.list-card-labels > span.card-label');
                const target = element.querySelector('.list-card-details');
                if(target != null){
                    updateCardColour(<HTMLElement>target, labelNodes);        
                }
        
        }
    });
});

observer.observe(target,{
        childList: true,
        subtree: true
});


function updateCardColour(target: HTMLElement, labelNodes: NodeList){
    if(labelNodes != null){
        if(labelNodes.length == 1) {
            const labelNode:HTMLElement = <HTMLElement>labelNodes[0];
            const colour:string = window.getComputedStyle(labelNode).backgroundColor;
            // const brightness:Number = getBrightness(colourValue.red, colourValue.green ,colourValue.blue);
            const colourValue = getRGB(colour);
            target.style.background = '';
            target.style.backgroundColor = colour.replace('rgb','rgba').replace(')',',0.5)');
            // if(brightness < 0.5){
            //     (<HTMLElement>element.querySelector('.list-card-title')).style.color = '#fafafa';
            // }

        } else if(labelNodes.length >= 2 ) {
            target.style.background = buildGradientString(labelNodes);
        } else if (labelNodes.length == 0){
            target.style.background = '';
            target.style.backgroundColor = '';
        }

    }
}

function buildGradientString(labelNodeList: NodeList, degree: number = 125){
    let cssString = `linear-gradient(${degree}deg,`;
    const piece: number = 100 / labelNodeList.length;
    labelNodeList.forEach((node: HTMLElement,index:number) => {
                const colour:string = window.getComputedStyle(node).backgroundColor.replace('rgb','rgba').replace(')',',0.5)');
                cssString += `${colour} ${index * piece}%, ${colour} ${(index+1) * piece}%,`;
    });
    cssString = `${cssString.slice(0,-1)})`;
    return cssString;
}

function getRGB(rgbString: string){
    const colours = rgbString.match(/(\d{1,3}).+?(\d{1,3}).+?(\d{1,3})/);
    if(colours != null){
        return {
            red: parseInt(colours[1]),
            green: parseInt(colours[2]),
            blue: parseInt(colours[3])
        }
    } else {
        return {
            red:0, green:0, blue:0
        }
    }
}
function getBrightness(red: number, green: number, blue:number){
    return Math.max(red,green,blue)/255;
}