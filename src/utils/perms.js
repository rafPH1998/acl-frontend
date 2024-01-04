import { useStore } from 'vuex'

export function hasPermission(permissionName, permissionType) {
  const store = useStore();

  const userPermissions = store.state.user.permissions; 
  return userPermissions.some(permission => 
    permission.name === permissionName && permission.description === permissionType
  );
}