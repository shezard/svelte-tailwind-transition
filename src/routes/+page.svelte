<script lang="ts">
    import transition from '$lib/tailwind-variants-transition';

    const card = transition({
        base: 'flex border border-black rounded justify-center transition-all',
        variants: {
            size: {
                small: 'w-20',
                big: 'w-40 p-4',
            },
            color: {
                red: 'bg-red-500',
                green: 'bg-green-500',
            }
        },
        transitions: {
            size: [{
                from: 'small',
                to: 'big',
                class: 'duration-1000'
            }, {
                from: 'big',
                to: 'small',
                class: 'duration-500'
            }],
        }
    });

    let state : 'big' | 'small' = 'small';

    function toggleState() {
        if(state == 'small') {
            state = 'big'
        } else {
            state = 'small';
        }
    }

</script>

<div class="container mx-auto">
    <div class="flex flex-col p-4 gap-4">
        <button class={card()}>
            Content
        </button>
        <button class={card({ size: state, color: 'green'})} on:click={toggleState}>
            Content 2
        </button>
    </div>
</div>
