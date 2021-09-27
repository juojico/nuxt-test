import apiList from '@/api';

export default function({ $axios }, inject) {
  // Create a custom axios instance
  const api = (name, payload, pager) => {
    const { method, url } = apiList[name](payload);

    if (pager) {
      payload = Object.assign({}, payload, {
        pageNo: pager.page,
        pageSize: pager.pageSize,
      });
    }

    switch (method) {
      case 'POST':
        return $axios.post(url, payload);
      case 'GET':
        return $axios.get(url, { params: payload });
      case 'PUT':
        return $axios.put(url, payload);
      case 'PATCH':
        return $axios.patch(url, payload);
      case 'DELETE':
        return $axios.delete(url, { params: payload });
      case 'FILE':
        return $axios.get(url, { params: payload, responseType: 'blob' });
      default:
        return $axios.post(url, payload);
    }
  };

  // Inject to context as $api
  inject('api', api);
}
