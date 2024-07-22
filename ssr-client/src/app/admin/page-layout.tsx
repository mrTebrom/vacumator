'use client';
import axios from 'axios';
import styles from './style.module.css';
import { useAppDispatch } from '@/lib/store.hook';
import { setToken } from '@/lib/slice/token.slice';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
// Определение и экспорт компонента FormAuthorization
export default function FormAuthorization() {
  const dispatch = useAppDispatch(); // Получение функции dispatch из хука useAppDispatch
  const router = useRouter();
  // Функция для обработки запроса к API
  const handleApiRequest = async (endpoint: string, values: any) => {
    try {
      // Отправка POST-запроса с использованием Axios
      axios
        .post(`http://localhost:5000/api/auth/${endpoint}`, values)
        .then((result) => {
          console.log(result); // Вывод результата в консоль
          dispatch(setToken(result.data)); // Диспатч экшена для установки токена в Redux
          localStorage.setItem('access_token', result.data); // Сохранение токена в localStorage
          router.push('/admin/product');
        });
    } catch {}
  };

  return (
    // Использование компонента Form из библиотеки Ant Design
    <Form
      className={styles.form}
      layout="vertical"
      onFinish={(values: any) => handleApiRequest('login', values)} // Вызов handleApiRequest при отправке формы
    >
      {/* Поле ввода для логина */}
      <Form.Item
        label="Логин"
        name="email"
      >
        <Input />
      </Form.Item>
      {/* Поле ввода для пароля */}
      <Form.Item
        label="Пороль"
        name="password"
      >
        <Input />
      </Form.Item>
      {/* Кнопка для отправки формы */}
      <Form.Item>
        <Button htmlType="submit">Войти</Button>
      </Form.Item>
    </Form>
  );
}
