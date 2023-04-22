<template>
  <div class="loader__center"><img alt="Loading..." src="../assets/Iphone-spinner-2.gif"></div>
</template>

<script>
export default {
  name: 'LoaderComponent',
};
</script>

<style>
.loader__center {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
