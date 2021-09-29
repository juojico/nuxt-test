<template>
  <div class="jobsContentWrapper">
    <FilterMenu :menu="companyMenu" @filterChange="filterChange" ref="filterMenu"></FilterMenu>

    <div class="container">

      <TopArea :companyDetail="companyDetail" class="topArea" ref="info"></TopArea>

      <Card title="公司介紹" ref="description">
        <div class="cardConent">{{companyDetail.description}}</div>
      </Card>
      <Card title="服務項目" ref="services">
        <div class="cardConent">{{companyDetail.services}}</div>
      </Card>
      <Card title="福利制度" ref="benefits">
        <div class="cardConent">{{companyDetail.benefits}}</div>
      </Card>

      <ContactBox :item="companyDetail" class="mapCard" ref="contact" />

      <JobList ref="vacancies" />

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { companyMenu } from '~/utils/company';
  import ContactBox from '~/components/ContactBox';
  import FilterMenu from '~/components/FilterMenu';
  import TopArea from './components/TopArea';
  import JobList from './components/JobList';

  export default {
    name: 'Company',
    components: {
      ContactBox,
      FilterMenu,
      TopArea,
      JobList,
    },
    data() {
      return {
        companyMenu,
        companyDetail: {},
      };
    },
    computed: {
      ...mapGetters('jobsModules', ['currentCompanyId']),
    },
    methods: {
      ...mapActions('jobsModules', ['setCurrentCompanyId']),
      getCompanyDetail() {
        this.$api('getCompany', { oid: this.currentCompanyId }).then(data => {
          this.companyDetail = data;
        });
      },
      filterChange(value) {
        if (value !== 'info') {
          this.$refs[value].$el.scrollIntoView(true);
        }

        if (process.browser) {
          if (window.scrollY) {
            const menuHeight = this.$refs.filterMenu.$el.clientHeight;
            const scrollTtop =
              value === 'info' ? 0 : this.$refs[value].$el.offsetTop - menuHeight;
            window.scroll({
              top: scrollTtop,
              left: 0,
              behavior: 'smooth',
            });
          }
        }
      },
    },
    mounted() {
      const query = this.$route.query;
      if (query) this.setCurrentCompanyId(query.id || 0);
      this.getCompanyDetail();
    },
  };
</script>

<style lang="scss" scoped>
  .jobsContentWrapper {
    @include area();
    background-color: $bgGrey1;

    .cardConent {
      padding: 0 40px 30px 40px;
      line-height: 1.5em;
      white-space: break-spaces;

      @include rwd() {
        padding: 0 20px 30px 20px;
      }
    }

    .mapCard {
      padding: 20px 0;
    }
  }
</style>

