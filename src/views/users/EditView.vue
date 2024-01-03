<template>
  <MainView>
    <div v-if="!loading" class="bg-white rounded-lg shadow-lg w-full text-gray-700">
      <form method="POST" class="mt-4">
        <div class="grid gap-4 grid-cols-2 px-6">

          <div>
            <p>Nome:</p>
            <input type="text" name="name" v-model="users.name"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded border-2 outline-none" placeholder="name">
          </div>

          <div>
            <p>E-mail:</p>
            <input type="email" name="email" v-model="users.email"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded border-2 outline-none" placeholder="name">
          </div>

          <div>
            <p>Senha:</p>
            <input type="password" name="password"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded border-2 outline-none" placeholder="name">
          </div>

          <div>
            <p>Confirmar senha:</p>
            <input type="password" name="password_confirm"
              class="mr-2 mb-5 p-1 w-full focus:border-blue-700 rounded border-2 outline-none" placeholder="name">
          </div>

        </div>
      </form>

      <div class="mt-2 p-6">
        <div v-for="(descriptions, groupName) in groupedPermissions" :key="groupName">
          <h2 class="mt-4">{{ groupName }}</h2>
          <div class="p-2 border text-xs shadow border rounded bg-gray-100 flex items-center">
            <p v-for="{ id, description } in descriptions" :key="id" class="text-gray-500">
              <label class="flex items-center">
                <input class="ml-2 accent-blue-700/25 w-4 h-4 cursor-pointer" type="checkbox"
                  :checked="checkPermissions(groupName, description)" @click="syncPermissions(id)">
                {{ description }}
              </label>
            </p>
          </div>
        </div>

        <div class="mt-16 flex justify-between">
          <router-link :to="{ name: 'usuarios' }" class="items-center border rounded px-6 hover:bg-red-500
                        py-1 bg-red-400 text-white text-xs flex font-bold">
            <BackView />
            Voltar
          </router-link>

          <button @click="updatePermissions()" :disabled="loadingUpdatePermission"
            :class="{ 'bg-blue-700': loadingUpdatePermission }" class="items-center border 
                            rounded w-48 flex justify-center 
                            py-1 bg-blue-500 text-white text-xs 
                            flex font-bold hover:bg-blue-600">
            <SaveView :loading="loadingUpdatePermission" />
            <SppinerView :loading="loadingUpdatePermission" />
            <span v-if="loadingUpdate">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <SppinerView :loading="loading" class="w-4 h-4 stroke-blue-600 text-blue-500" />
    </div>
  </MainView>
</template>
 
<script setup>
import MainView from '../layout/MainView.vue';
import { ref, reactive, onMounted, defineProps, computed } from 'vue';
import axios from 'axios'
import { useStore } from 'vuex'
import SppinerView from '@/icons/SppinerView.vue'
import SaveView from '@/icons/SaveView.vue'
import BackView from '@/icons/BackView.vue'
import { toast } from 'vue3-toastify';

const props = defineProps({
  id: {
    type: String,
    require: true
  }
})

const store = useStore()

const users = reactive({
  name: '',
  email: '',
  password: '',
})

let permissions = ref([])
const permissionsUser = ref([])
const permissionsIds = ref()
const loading = ref(false);
const loadingUpdatePermission = ref(false);

onMounted(async () => {
  loading.value = true
  try {
    const response = await axios.get(`http://localhost:8899/users/${props.id}`, {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });
    const user = response.data.data;
    permissionsUser.value = response.data.data.permissions

    users.name = user.name
    users.email = user.email

    const perms = await getPermissions()
    permissions.value = perms.data.data;

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

//AGRUDA AS PERMISSSOES POR NOME
const groupedPermissions = computed(() => {
  const res = {};

  permissions.value.forEach(permission => {
    const groupName = permission.name;
    const description = permission.description;
    const id = permission.id;

    if (!res[groupName]) {
      res[groupName] = [];
    }

    res[groupName].push({
      id,
      description
    });
  });

  return res;
});

/* PEGA OS IDS DAS PERMISSOES DO USUARIO */
const permissionsIdsUserSelected = computed(() => {
  return permissionsUser.value.map(permission => permission.id);
});

/* SINCRONIZA AS PERMISSOES  */
const syncPermissions = (permissionId) => {

  permissionsIds.value = permissionsIdsUserSelected.value
  const index = permissionsIds.value.indexOf(permissionId);

  if (index !== -1) {
    permissionsIds.value.splice(index, 1);
  } else {
    permissionsIds.value.push(permissionId);
  }
}

/* ATUALIZA INFORMACOES PARA O BACKEND  */
const updatePermissions = async () => {
  loadingUpdatePermission.value = true
  try {
    const response = await axios.post(
      `http://localhost:8899/users/${props.id}/permissions-sync`,
      { permissions: permissionsIds.value },
      {
        headers: {
          Authorization: `Bearer ${store.state.token}`
        }
      }
    );

    console.log(response);
  } catch (error) {
    console.error('Erro na requisição:', error);
  } finally {
    loadingUpdatePermission.value = false
    toast.success("Alterações salvas com sucesso!", {
      autoClose: 2000,
      position: 'bottom-right'
    });
  }
};

/* CHEGA AS PERMISSOES PARA DEIXAR O CHECKED NO HTML ATIVADO OU DESATIVADO */
const checkPermissions = (groupName, description) => {
  return permissionsUser.value.some(permission => permission.name === groupName && permission.description === description);
}

/* PEGA TODAS AS PERMISSOES DISPONIVEIS NO SISTEMA */
const getPermissions = async () => {
  try {
    return await axios.get('http://localhost:8899/permissions', {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });
  } catch (error) {
    console.error(error)
  }
}
</script>
 
