<template>
  <div class="proNavBar">
    <nav-bar>
      <div slot="center">
        <div>{{'个人中心'}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "ProNavBar",
    components: {
      NavBar,
    }
  }
</script>

<style scoped>
  .proNavBar {
    background-color: var(--color-tint);
    color: #ffffff;
  }

</style>
