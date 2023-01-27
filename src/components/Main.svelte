<script>
    import {data} from '../services/api.js';
    import ChatWindow from './ChatWindow.svelte';
    let isTextArea = false;
    let isLoading = false;
    function toggleTextArea() {
        isTextArea = !isTextArea; 
        console.log(isTextArea);
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
    <ChatWindow />

    {:else}
        <div class="flex flex-col justify-between max-w-5xl rounded-lg mx-auto mt-24 bg-white dark:bg-gray-800 z-10 relative min-h-[32rem]">
            <div class="flex flex-col align-center justify-between text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 relative" >
                <h1 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">

                       ¿Pensando en irte a Argentina o conocer su cultura?
                    </h1>

                    <h2 class=" text-indigo-500 text-3xl">
                        Explora nuevas recetas
                    </h2>  
        </div>
        <div>
        <img src="ezgif-5-01fa5d91e3.webp" alt="messi" class="mx-auto"/>    
        </div>  
        <div class="flex justify-evenly py-6">
            <button
            on:click={toggleTextArea}
            type="button"
            class='boton-primario'
          >
            Probar
          </button>
        </div>
        </div>
    {/if}
    