<script>
    import "../app.css";
  </script>
  
  <slot />

  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.slate.900);
      color: theme(colors.white);
      height: 100%;
      widows: 100%;
    }
    :global(body) {
      height: 100%;
      widows: 100%;
    }
  </style>