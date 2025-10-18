/* eslint-disable no-unused-vars */
// Simple state management without Redux for now
// You can replace this with Redux Toolkit later if needed

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

class AuthStore {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  private listeners: Array<(_state: AuthState) => void> = [];

  getState(): AuthState {
    return { ...this.state };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscribe(listener: (_state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private setState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(email: string, _password: string) {
    this.setState({ loading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user data
      const user: User = {
        id: "1",
        name: "Nguyễn Văn A",
        email: email,
        avatar: "https://via.placeholder.com/100",
      };

      this.setState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch {
      this.setState({
        loading: false,
        error: "Đăng nhập thất bại",
      });
      return { success: false, error: "Đăng nhập thất bại" };
    }
  }

  logout() {
    this.setState({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  }

  clearError() {
    this.setState({ error: null });
  }
}

export const authStore = new AuthStore();
