
<script type='module'>
    import Loader from './Loader.svelte';
    import { afterUpdate } from 'svelte';
    import {data as api} from '../services/api.js';
    const URL_RECIPE = 'https://cocinerosargentinos.com/busqueda?q=';

    let messages = [{
        text: 'Hi, I am a chatbot. I can help you find recipes. What ingredients do you have?',
        isUser: false,
        isLink: false
    }];
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


    const botResponse= async (answer) => {
        const response = await api(answer);
        const result = response.generations[0].text.replace('--', '').replace(':','')
        const search = URL_RECIPE.concat(result.trim().split(' ').join('+'));
        messages = [...messages, { text: result , isUser: false, isLink:search.includes('https') ? true : false, link: search}];
        currentMessage = '';
        promise = false;
    }
  
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


    </script>
  


  <section class="container relative px-3 min-h-fit w-96 mt-32 z-0 flex flex-col justify-end mx-auto chat-window bg-slate-400 dark:bg-slate-700 h-96 rounded-lg">

      <div bind:this={element} class="messages overflow-y-auto flex flex-col  p-4 scroll-mb-0">
        
        {#if promise}
        <Loader />

        {:else}
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
        {/if}
        </div>

    
    

    

    <div class=" flex m-1"  >
      <input on:keypress={keyPress}
       type="text"
       class="p-2 flex-1 focus:outline-none caret-current rounded-xl" bind:value={currentMessage} placeholder="Type your message here" />
      <button 
        on:click={handleClick}
        
        type="button"
        class="px-2 rounded-xl ">
        <svg height="48px" width="48px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#008BF2;" d="M496,320.8c0,96.8-78.4,175.2-175.2,175.2H175.2C78.4,496,0,417.6,0,320.8V175.2 C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2V320.8z"></path> <path style="fill:#0078EF;" d="M0,175.2C0,78.4,78.4,0,175.2,0h145.6C417.6,0,496,78.4,496,175.2v145.6 c0,96.8-78.4,175.2-175.2,175.2"></path> <path style="fill:#0071E2;" d="M320.8,0C417.6,0,496,78.4,496,175.2v145.6c0,96.8-78.4,175.2-175.2,175.2"></path> <g> <path style="fill:#FFFFFF;" d="M299.2,260h-120c-6.4,0-12-5.6-12-12s5.6-12,12-12h120c6.4,0,12,5.6,12,12S306.4,260,299.2,260z"></path> <path style="fill:#FFFFFF;" d="M269.6,306.4c-3.2,0-6.4-0.8-8.8-3.2c-4.8-4.8-4.8-12,0-16.8l38.4-38.4l-38.4-38.4 c-4.8-4.8-4.8-12,0-16.8s12-4.8,16.8,0l46.4,46.4c4.8,4.8,4.8,12,0,16.8l-46.4,46.4C275.2,305.6,272.8,306.4,269.6,306.4z"></path> </g> </g></svg>
      </button>
    </div>


</section>
