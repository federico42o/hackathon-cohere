<script>
    import ChatWindow from './ChatWindow.svelte';
    let isTextArea = false;

    function toggleTextArea() {
        isTextArea = !isTextArea; 
        console.log(isTextArea);
    }



</script>
    
    {#if isTextArea}
    <ChatWindow />

    {:else}
        <div class="flex flex-col justify-between max-w-5xl rounded-lg m-auto bg-neutralz-10 relative min-h-[32rem]">
            <div class="flex flex-col align-center justify-between text-center w-full mx-auto
             py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 relative" >
                <h1 class="text-3xl font-extrabold sm:text-4xl">

                       ¿Pensando en visitar Argentina o conocer nuestra cultura?
                    </h1>

                    <h2 class="text-2xl">
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
            class='boton-primario'>
            Probar
          </button>
        </div>
        </div>
    {/if}
    
    