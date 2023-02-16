
<script type='module'>
    import Loader from './Loader.svelte';
    import { afterUpdate } from 'svelte';
    import {data as api} from '../services/api.js';
    const URL_RECIPE = 'https://cocinerosargentinos.com/busqueda?q=';
    let date = new Date();
    let messages = [{
        text: 'Hi, I am a chatbot. I can help you find argentinian recipes. What ingredients do you have?',
        isUser: false,
        isLink: false
    }];
    let record = [];
    let currentMessage = '';
    let alreadyWelcomed = false;
    let promise = false
    afterUpdate(async () => {
        
        if (!alreadyWelcomed) {
            promise =true;
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            messages = [...messages, { text: 'Write them separated by a comma', isUser: false }];
            currentMessage = '';
            alreadyWelcomed = true;
            promise = false;
        }
    });
    const addRecord = (response,link) => {
        if (!promise && record.text !== '') {
            record= [...record, {text: response.trim(), link: link, date: date.toLocaleString()}];
            window.localStorage.setItem('answers', JSON.stringify(record));
        }
      };
    
      const clearRecords = () => {
        window.localStorage.setItem('answers', JSON.stringify([]));
      };
    let audio;
    const botResponse= async (answer) => {
        const response = await api(answer);
        const result = response.generations[0].text.replace('--', '')
        const start = result.indexOf(":") + 2;
        const slice = result.slice(start);
        const search = URL_RECIPE.concat(slice.trim().split(' ').join('+'));
        audio.play();
        messages = [...messages, { text: result , isUser: false, isLink:search.includes('https') ? true : false, link: search}];
        currentMessage = '';
        promise = false;  
        addRecord(result,search);

    }
    console.log(record)
    const  handleClick = async () => {
        if (alreadyWelcomed) {
            messages = [...messages, { text: currentMessage, isUser: true }];
            currentMessage = '';
            promise = true;
        }
        if(promise){
            await botResponse(messages[messages.length - 1].text);
            promise = false;
        }

        currentMessage = '';
    
    };
    

    const keyPress = e =>{
        if(e.charCode === 13){
             handleClick();
        }
    }


    let list = [];
    let element;
      
        

        afterUpdate(() => {
            console.log("afterUpdate");
            if(list) scrollToBottom(element);
      });
        

    
      const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
      };

      function dragMe(node) {
        if (navigator.userAgent.match(/Mobi/i) || navigator.maxTouchPoints > 0) {
            return;
          }
        let moving = false;
        let left = window.innerWidth / 2 - node.offsetWidth / 2;
        let top = window.innerHeight / 2 - node.offsetHeight;
          console.log(left,top)
        node.style.position = 'absolute';
        node.style.top = `${top}px`;
        node.style.left = `${left}px`;
        
        node.style.cursor = 'grab';
        node.style.userSelect = 'none';

        node.addEventListener('mousedown', () => {

            moving = true;
        });
        
       window.addEventListener('mousemove', (e) => {
             if (moving) {

                    left += e.movementX;
                    top += e.movementY;
                    node.style.top = `${top}px`;
                    node.style.left = `${left}px`;
                    node.style.cursor = `grabbing`;
               }
            });
            
       
        window.addEventListener('mouseup', () => {
            moving = false;
            node.style.cursor = `grab`;
        });
   
   }

   let volume = true;
    const toggleVolume = () => {
        volume = !volume;
        if(volume){
            audio.volume = 1;
        }else{
            audio.volume = 0;
        }
      }




    </script>
  


  <section use:dragMe class="container relative px-3 min-h-fit w-96 mt-32 z-0 flex flex-col justify-end mx-auto chat-window font-semibold bg-zinc-900 dark:bg-slate-700 h-96 rounded-lg cursor-grab">
    <div class="flex justify-between w-full self-start my-1 h-10 flex-1">
      <button class="h-8">
        <svg fill="#499bf1" width="30px" height="30px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>history-line</title> <path d="M18,9.83a1,1,0,0,0-1,1v8.72l5.9,4A1,1,0,0,0,24,21.88l-5-3.39V10.83A1,1,0,0,0,18,9.83Z" class="clr-i-outline clr-i-outline-path-1"></path><path d="M18,2A16.09,16.09,0,0,0,4,10.26V5.2a1,1,0,0,0-2,0V14h8.8a1,1,0,0,0,0-2H5.35A14,14,0,1,1,8.58,28.35a1,1,0,0,0-1.35,1.48A16,16,0,1,0,18,2Z" class="clr-i-outline clr-i-outline-path-2"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
      </button>


      <span class="h-8 text-white ">
        {date.toLocaleDateString()}
      </span>
      <button on:click={toggleVolume} class="h-8">
        {#if !volume}
          <svg width="32x" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22.5314 13.4197L21.0814 11.9697L22.4814 10.5697C22.7714 10.2797 22.7714 9.79969 22.4814 9.50969C22.1914 9.21969 21.7114 9.21969 21.4214 9.50969L20.0214 10.9097L18.5714 9.45969C18.2814 9.16969 17.8014 9.16969 17.5114 9.45969C17.2214 9.74969 17.2214 10.2297 17.5114 10.5197L18.9614 11.9697L17.4714 13.4597C17.1814 13.7497 17.1814 14.2297 17.4714 14.5197C17.6214 14.6697 17.8114 14.7397 18.0014 14.7397C18.1914 14.7397 18.3814 14.6697 18.5314 14.5197L20.0214 13.0297L21.4714 14.4797C21.6214 14.6297 21.8114 14.6997 22.0014 14.6997C22.1914 14.6997 22.3814 14.6297 22.5314 14.4797C22.8214 14.1897 22.8214 13.7197 22.5314 13.4197Z" fill="#292D32"></path> <path d="M14.02 3.78168C12.9 3.16168 11.47 3.32168 10.01 4.23168L7.09 6.06168C6.89 6.18168 6.66 6.25168 6.43 6.25168H5.5H5C2.58 6.25168 1.25 7.58168 1.25 10.0017V14.0017C1.25 16.4217 2.58 17.7517 5 17.7517H5.5H6.43C6.66 17.7517 6.89 17.8217 7.09 17.9417L10.01 19.7717C10.89 20.3217 11.75 20.5917 12.55 20.5917C13.07 20.5917 13.57 20.4717 14.02 20.2217C15.13 19.6017 15.75 18.3117 15.75 16.5917V7.41168C15.75 5.69168 15.13 4.40168 14.02 3.78168Z" fill="#292D32"></path> </g></svg>
        {:else}
          <svg width="32x" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.0003 16.7503C17.8403 16.7503 17.6903 16.7003 17.5503 16.6003C17.2203 16.3503 17.1503 15.8803 17.4003 15.5503C18.9703 13.4603 18.9703 10.5403 17.4003 8.45027C17.1503 8.12027 17.2203 7.65027 17.5503 7.40027C17.8803 7.15027 18.3503 7.22027 18.6003 7.55027C20.5603 10.1703 20.5603 13.8303 18.6003 16.4503C18.4503 16.6503 18.2303 16.7503 18.0003 16.7503Z" fill="#292D32"></path> <path d="M19.8284 19.2503C19.6684 19.2503 19.5184 19.2003 19.3784 19.1003C19.0484 18.8503 18.9784 18.3803 19.2284 18.0503C21.8984 14.4903 21.8984 9.51027 19.2284 5.95027C18.9784 5.62027 19.0484 5.15027 19.3784 4.90027C19.7084 4.65027 20.1784 4.72027 20.4284 5.05027C23.4984 9.14027 23.4984 14.8603 20.4284 18.9503C20.2884 19.1503 20.0584 19.2503 19.8284 19.2503Z" fill="#292D32"></path> <path d="M14.02 3.78168C12.9 3.16168 11.47 3.32168 10.01 4.23168L7.09 6.06168C6.89 6.18168 6.66 6.25168 6.43 6.25168H5.5H5C2.58 6.25168 1.25 7.58168 1.25 10.0017V14.0017C1.25 16.4217 2.58 17.7517 5 17.7517H5.5H6.43C6.66 17.7517 6.89 17.8217 7.09 17.9417L10.01 19.7717C10.89 20.3217 11.75 20.5917 12.55 20.5917C13.07 20.5917 13.57 20.4717 14.02 20.2217C15.13 19.6017 15.75 18.3117 15.75 16.5917V7.41168C15.75 5.69168 15.13 4.40168 14.02 3.78168Z" fill="#292D32"></path> </g></svg>
          {/if}
        </button>
    </div>
      <div bind:this={element} class="messages overflow-y-auto flex flex-col p-4 scroll-mb-0">
        

        
        {#each messages as message}
        <span href={message.link} target="_blank" rel="noreferrer" class="message break-normal max-w-fit rounded-xl px-2 {message.isUser ? 'is-user' : 'bot'}">
            {message.text}
        </span>
        
        {#if message.isLink}
        <a href={message.link} target="_blank" rel="noreferrer" class="message break-normal max-w-fit rounded-xl px-2 {message.isUser ? 'is-user' : 'bot'}">
            Here is a link to the recipe, enjoy! 😁🍴
        </a>
        
        {/if}
        {/each}

        {#if promise}
        <Loader />
        {/if}
        </div>

    
    

    

    <div class=" flex m-1"  >
      <input on:keypress={keyPress}
       type="text"
       class="p-2 flex-1 focus:outline-none caret-current rounded-xl text-zinc-900" bind:value={currentMessage} placeholder="e.g.: meat,cheese,onions" />
      <button 
        on:click={handleClick}
        
        type="button"
        class="px-2 rounded-xl ">
        <svg height="48px" width="48px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#008BF2;" d="M496,320.8c0,96.8-78.4,175.2-175.2,175.2H175.2C78.4,496,0,417.6,0,320.8V175.2 C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2V320.8z"></path> <path style="fill:#0078EF;" d="M0,175.2C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2v145.6 c0,96.8-78.4,175.2-175.2,175.2"></path> <path style="fill:#0071E2;" d="M320.8,0C417.6,0,496,78.4,496,175.2v145.6c0,96.8-78.4,175.2-175.2,175.2"></path> <g> <path style="fill:#FFFFFF;" d="M299.2,260h-120c-6.4,0-12-5.6-12-12s5.6-12,12-12h120c6.4,0,12,5.6,12,12S306.4,260,299.2,260z"></path> <path style="fill:#FFFFFF;" d="M269.6,306.4c-3.2,0-6.4-0.8-8.8-3.2c-4.8-4.8-4.8-12,0-16.8l38.4-38.4l-38.4-38.4 c-4.8-4.8-4.8-12,0-16.8s12-4.8,16.8,0l46.4,46.4c4.8,4.8,4.8,12,0,16.8l-46.4,46.4C275.2,305.6,272.8,306.4,269.6,306.4z"></path> </g> </g></svg>
      </button>
    </div>

    <audio src="among_chat.mp3" bind:this={audio} ></audio>


</section>




