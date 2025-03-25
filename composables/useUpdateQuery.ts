export default function useUpdateRouteQuery(
  key: string,
  value: string | number
) {
  const router = useRouter();
  const routeQuery = { ...router.currentRoute.value.query };
  if (!value) {
    delete routeQuery[key];
  } else {
    routeQuery[key] = value;
  }

  router.replace({ query: routeQuery });

  function clearRouteQuery(params?: string[]) {
    if (params?.length) {
      for (const i in params) {
        delete routeQuery[params[i]];
      }
      router.replace({ query: routeQuery });
    } else {
      router.replace({ query: {} });
    }
  }

  return { clearRouteQuery };
}
