'use client'
import CloseIcon from '@/app/icons/close-icon';
import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import Button from '../Button/Button';


const LoginInfoModal = () => {
      const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen((prev) => !prev)}>
      <div className="flex flex-col gap-7 items-center">
        <div className="bg-red-200 rounded-full flex-center size">
          <CloseIcon styles="text-red-500 size-16" />
        </div>
        <div className="text-center flex flex-col gap-2">
          <p className="text-red-500 text-3xl mb-3">توجه !!!</p>
          <small className="text-gray-700">
            با توجه به این که این سایت صرفا جهت ضمیمه شدن به رزومه طراحی شده
            برای مشاهده و امتحان بخش داشبورد از اطلاعات زیر برای ورود به عنوان
            ادمین استفاده کنید.
          </small>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <small>ایمیل :</small>
              <small className="text-primary-dark">admin@gmail.com</small>
            </div>
            <div className="flex items-center gap-1">
              <small>رمز عبور :</small>
              <small className="text-primary-dark">123456</small>
            </div>
          </div>
        </div>
        <div onClick={() => setIsModalOpen((prev) => !prev)}>
          <Button variant="primary-dark">متوجه شدم</Button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginInfoModal