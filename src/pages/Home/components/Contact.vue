<template>
  <div class="contactWrapper">
    <div class="container">
      <ContactBox :item="contactItem" />
    </div>
  </div>
</template>

<script>
  import ContactBox from '~/components/ContactBox';

  export default {
    name: 'Contact',
    components: { ContactBox },
    props: {
      item: { type: Object, default: () => {} },
    },
    data() {
      return {
        contactItem: {
          location: '台北市內湖區瑞光路335號11樓',
          email: 'official@step1ne.com',
          tel: '02-6605-7111',
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  .contactWrapper {
    @include area();
    padding: 40px 0 64px 0;
    background-color: $bgGrey1;
  }
</style>
