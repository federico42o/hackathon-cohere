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
        <div class="flex flex-col justify-between max-w-5xl rounded-lg mx-auto mt-16
         bg-white dark:bg-zinc-900 bg-blend-screen z-10 relative min-h-[32rem]">
            <div class="flex flex-col align-center justify-between text-center w-full mx-auto
             py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 relative" >
                <h1 class="text-3xl font-extrabold bg-white dark:bg-zinc-900 text-black
                 dark:text-white sm:text-4xl">

                       ¿Pensando en visitar Argentina o conocer nuestra cultura?
                    </h1>

                    <h2 class="text-primary text-2xl dark:bg-zinc-900">
                        Explora nuestras recetas con lo que tengas a la mano
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
    