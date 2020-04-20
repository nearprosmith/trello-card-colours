// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const target = document.body; 
const observer = new MutationObserver(function(mutations){
    mutations.forEach(item => {
        const element:HTMLElement = <HTMLElement>item.target;

        //Changed Colour 
        if(element.classList.contains('list-card-labels')){
            console.log(element);

            const labelNode = element.querySelector('span.card-label:first-child');
            if(labelNode != null){
                const colour:string = window.getComputedStyle(labelNode).backgroundColor;
                const colourValue = getRGB(colour);
            
                // console.log(element.parentElement);
                (<HTMLElement>element.parentElement).style.backgroundColor = colour.replace('rgb','rgba').replace(')',',0.5)');;
            }
        }

        //Initial or Created cards
        if(element.classList.contains('list-card')){
            // console.log(element);
            // console.log(element.children);
            // const listCardLabels = Array.prototype.filter.call(element.children, function(child: Node){
            //     return (<HTMLElement>child).classList.contains('list-card-labels')
            // });
            
            //get first node. todo: mixed color pattern.
            const labelNode = element.querySelector('.list-card-labels > span.card-label:first-child');
            if(labelNode != null){
                const colour:string = window.getComputedStyle(labelNode).backgroundColor;
                const colourValue = getRGB(colour);
                // const brightness:Number = getBrightness(colourValue.red, colourValue.green ,colourValue.blue);
                
                (<HTMLElement>element.querySelector('.list-card-details')).style.backgroundColor = colour.replace('rgb','rgba').replace(')',',0.5)');;
                // if(brightness < 0.5){
                //     (<HTMLElement>element.querySelector('.list-card-title')).style.color = '#fafafa';

                // }
            }

        }
    });
});

observer.observe(target,{
        childList: true,
        subtree: true
});

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