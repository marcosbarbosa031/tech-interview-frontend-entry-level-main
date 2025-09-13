import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

describe('useForm', () => {
  const initialState = {
    name: '',
    email: '',
    preferences: []
  };

  it('Deve inicializar com o estado inicial fornecido', () => {
    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  });

  it('Deve atualizar dados do formulário quando handleChange é chamado', () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'John Doe');
    });

    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.formData.email).toBe('');
  });

  it('Deve atualizar dados de array corretamente', () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('preferences', ['pref1', 'pref2']);
    });

    expect(result.current.formData.preferences).toEqual(['pref1', 'pref2']);
  });

  it('Deve resetar para estado inicial quando resetToDefault é chamado', () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'John Doe');
      result.current.handleChange('email', 'john@example.com');
    });

    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.formData.email).toBe('john@example.com');

    act(() => {
      result.current.resetToDefault();
    });

    expect(result.current.formData).toEqual(initialState);
  });

  it('Deve lidar com múltiplas atualizações de campos corretamente', () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'John');
    });

    act(() => {
      result.current.handleChange('email', 'john@test.com');
    });

    act(() => {
      result.current.handleChange('preferences', ['marketing']);
    });

    expect(result.current.formData).toEqual({
      name: 'John',
      email: 'john@test.com',
      preferences: ['marketing']
    });
  });

  it('Deve manter estabilidade de referência de função', () => {
    const { result, rerender } = renderHook(() => useForm(initialState));

    const firstHandleChange = result.current.handleChange;
    const firstResetToDefault = result.current.resetToDefault;

    rerender();

    expect(result.current.handleChange).toBe(firstHandleChange);
    expect(result.current.resetToDefault).toBe(firstResetToDefault);
  });
});
