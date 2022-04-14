import './style.css'
import tpl from './tpl.html'
const $tpl = $(tpl);


export default function (){

$('#screen').append($tpl);



var getAssets = _=>{
  this.emit('preload')
var i = 0;

var load = _=>{
  var asset = this.current.assets[i];
  
  if(/\.mp3|\.wav|\.ogg/i.test(asset.url)){
    var sound = new Howl({src: asset.url});
        sound.on('end', ()=>this.emit('audioEnd', asset.name))
        sound.on('load', _=>{
          this.$store[asset.name] = sound;
          if( this.current.assets.length-1>=++i){
            this.emit('load', asset);
            load()
            
          }else{
            this.emit('postload');
          }             
        })
        sound.on('loaderror', ()=>{
          console.error(`File not found [ ${asset.name} ]`);
        })
  }
  else if(/\.png|\.jpg|\.jpeg|\.webp|\.gif/i.test(asset.url)){
      if(this.TREE.$root?.package){
          if(this.TREE.$root.package?.preload ){
            
            if(this.current.assets.length-1>=++i){
              if(this.TREE.$root.package.preload){
                    let img = new Image();
                    img.src =  asset.url; 

                    img.onerror = ()=>{
                     
                      this.$store[asset.name] = img;
                      this.emit('load', asset);
                      console.error('Image not found');
                      load();
                    };
                    img.onload = ()=>{
                      this.$store[asset.name] = img;
                      this.emit('load', asset);
                      load();
                    }

              }
              else{
                this.$store[asset.name] = asset.url;
                load();
              }

            }else{
                  this.emit('postload');
            };

          }
      }
  }
  else{
    ++i
    load();
    console.warn(asset.url +' Format not supported')
  }
};

load();


};

const setAllAssets = ()=>{
    for(let [scene, body] of Object.entries(this.TREE)){
        this.current.assets = this.current.assets.concat(body.assets);
    };
    /**
     * Загрузка ресурсов происходит только тогда, когда есть ресурсы
     */
    if(this.current.assets.length>0){
          getAssets();
    }
    /**
     * Если ресурсов нет, то эмулируем событыия, будто ресурсы есть
     * [ postlaod ] - Является важным событием, так как первый прыжок совершается
     * после этого события. Так же для коректной работы некоторых плагинов.
     * Которым требуются загруженные ресурсы.
     */
    else{
      setTimeout(()=>{
        this.emit('preload');
        this.emit('load');
        this.emit('postload');
      },0)
    }
}

  /**
   * Получили vn.json
   */
  this.on('setTree', setAllAssets);
  /**
   * Отображаем прелоэдер
   */
  this.on('preload', ()=>{
      $tpl.css('display', 'flex');
  });
  this.on('load', ()=>{

  })
  this.on('postload', ()=>{
      $tpl.fadeOut();
  });
}

