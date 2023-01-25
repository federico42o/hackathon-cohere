<script>
    import Button from './Button.svelte';
    import {data} from '../services/api.js';
    let isTextArea = false;
    let isLoading = false;
    function toggleTextArea() {
        isTextArea = !isTextArea; 
    }
    
    let promise = null;
    const  handleClick = async () => {
        isLoading = true;
        const btn =    document.querySelector('button');
        btn.classList.add('bg-blue-600');
        const prompt = document.querySelector('textarea').value;
        promise = data(prompt);

        const response = await promise;

        document.querySelector('textarea').value = response;
        promise = null;
        isLoading = false;
    }


</script>
    
    
    {#if isTextArea}

      <div class="flex flex-col justify-between max-w-5xl rounded-lg mx-auto mt-32 bg-white dark:bg-gray-800 z-10 relative min-h-[32rem]">
        <div class="flex flex-col align-center justify-between text-center w-full mx-autoz-20 relative mt-10" >
            <div class="text-3xl mb-5 font-extrabold text-black dark:text-white sm:text-4xl mt-10">
                <span class="block">
                    Escribe una palabra en tu jerga
                </span>
                <span class="block text-indigo-500">
                    y la traduciré al argentino &#127462;&#127479
                </span>
            </div>
        </div>
        <textarea class=" resize-none rounded-lg w-2/5 h-40 bg-white z-10 relative mx-auto ">
        </textarea>
        <div class="flex justify-evenly py-6">
        <button
        on:click={handleClick}
        type="button"
        class={`btn mx-auto px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none ${isLoading ? 'hidden' : ''}`}
      > 
        Preguntar
      </button>
      {#await promise}
          
      <button type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-sm ">
      <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
          </path>
      </svg>
      loading...
      </button>
      {/await}
    </div>
    </div>
  
    


    {:else}
        <div class="flex flex-col justify-between max-w-5xl rounded-lg mx-auto mt-32 bg-white dark:bg-gray-800 z-10 relative min-h-[32rem]">
            <div class="flex flex-col align-center justify-between text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 relative" >
                <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                    <span class="block">
                       Pensando en irte a Argentina ?
                    </span>
                    <span class="block text-indigo-500">
                        Aprende algunas palabras
                    </span>
                </h2>
                <p class="text-xl mt-4 max-w-md mx-auto text-gray-400">
                    Escribe una palabra en tu jerga y la traduciré al argentino &#127462;&#127479
                </p>
            </div>
        <div class="flex justify-evenly py-6">
            <button
            on:click={toggleTextArea}
            type="button"
            class={"btn px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"}
          >
            Probar
          </button>
        </div>
        </div>
    {/if}
    