<template>
  <div>
    <MainVisual :banners="banners" />
    <JobSearch :jobListData="jobList" />
    <CompanyList />
    <CityList />
    <Article />
    <About />
    <Contact />
  </div>
</template>

<script>
  import MainVisual from './Home/components/MainVisual';
  import JobSearch from './Home/components/JobSearch';
  import CompanyList from './Home/components/CompanyList';
  import CityList from './Home/components/CityList';
  import Article from './Home/components/Article';
  import About from './Home/components/About';
  import Contact from './Home/components/Contact';

  export default {
    name: 'Home',

    async asyncData({ $api }) {
      if (process.client) {
        const bannersData = await $api('getBanners');
        const jobListData = await $api('searchJobs', { size: 9, current: 1 });
        return {
          banners: bannersData || [],
          jobList: jobListData.records || [],
        };
      }

      return {
        banners: [],
        jobList: [],
      };
    },

    components: {
      MainVisual,
      JobSearch,
      CompanyList,
      CityList,
      Article,
      About,
      Contact,
    },
  };
</script>
