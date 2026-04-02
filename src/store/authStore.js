import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // Demo mode check
          if (credentials.email === 'rizki@mobilejaga.id' && credentials.password === 'password123') {
            set({
              user: {
                id: '1',
                email: 'rizki@mobilejaga.id',
                name: 'Rizki',
                avatar: null
              },
              isAuthenticated: true,
              isLoading: false
            })
            return { success: true }
          }

          // Validate credentials
          if (!credentials.email || !credentials.password) {
            throw new Error('Email dan password wajib diisi')
          }

          // Simulate successful login for any valid input
          set({
            user: {
              id: '1',
              email: credentials.email,
              name: credentials.email.split('@')[0],
              avatar: null
            },
            isAuthenticated: true,
            isLoading: false
          })
          return { success: true }
        } catch (error) {
          set({ error: error.message, isLoading: false })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
