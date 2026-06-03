import { ref } from 'vue'

export const isAdmin = ref(false)

export function login() {
    isAdmin.value = true
}

export function logout() {
    isAdmin.value = false
}
