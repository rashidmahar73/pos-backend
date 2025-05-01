function actionPermissions({ data }) {
  const { role } = data;

  if (role?.type !== "super_admin") {
    return {
      is_create_action: data?.is_create_action,
      is_read_action: data?.is_read_action,
      is_update_action: data?.is_update_action,
      is_delete_action: data?.is_delete_action,
      isSuperAdmin: false,
    };
  }
  return {
    isSuperAdmin: true,
  };
}

export { actionPermissions };
