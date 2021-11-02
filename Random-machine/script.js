let quotes= ["Success is most often achieved by those who don't know that failure is inevitable.","Things work out best for those who make the best of how things work out","If you are not willing to risk the usual, you will have to settle for the ordinary","Sometimes you can't see yourself clearly until you see yourself through the eyes of others.","All our dreams can come true if we have the courage to pursue them.","It does not matter how slowly you go, so long as you do not stop.","Success is walking from failure to failure with no loss of enthusiasm.","You only live once, but if you do it right, once is enough.","Opportunities don't happen. You create them.", "Try not to become a person of success, but rather try to become a person of value.","Live as if you were to die tomorrow. Learn as if you were to live forever","When you cease to dream you cease to live."]
let author=["Coco Chanel","John Wooden","Jim Rohn","Ellen DeGeneres","Walt Disney","Confucius","Winston Churchill","Mae West"," Chris Grosser","Albert Einstein","Mahatma Gandhi","Malcolm Forbes"] ;
let colors=['#20B2AA','#32CD32','#3CB371','#4682B4','#6A5ACD','#87CEEB','#8A2BE2','#CD5C5C','#F0E68C','#70c5b0','#ff6100','#ff4c4c'];
function quote (){
    let num=Math.floor((Math.random()*quotes.length));
    let randQuote=quotes[num];
    let randAuthor=author[num];
    let randColor=colors[num];

    document.getElementById('text').innerHTML=randQuote;
    document.getElementById('author').innerHTML=randAuthor;
    document.querySelector('body').style.backgroundColor=randColor;

}
quote();
document.getElementById('new-quote').addEventListener('click',(e)=>{
    e.preventDefault();
    quote();
});

