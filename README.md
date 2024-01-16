- Bind directive is a way to pass any variable from the component to the parent.

- Key blocks (#key) destroy and recreate their contents when the value of expression changes.

```svelte
{#key i}
    <p in:typewriter={{ speed: 10 }}>
        {messages[i] || ''}
    </p>
{/key}
```

- Svelte actions get access to the underlying DOM element and it's lifecycle methods

```svelte
    function action(node, options) {
        function handleClick() { console.log('click') }

        node.addEventListener('click', handleClick);

        return {
            destroy() {
                node.removeEventListener('click', handleClick);
            }
            update(options) {
                // ...
            }
        }
    }

    <p use:action>Element with action</p>
```

- Binding to components gives you access to exported functions inside that component