import { Modal, useMantineTheme } from '@mantine/core';
import css from '../styles/OrderModal.module.css';
import { useState } from 'react';
import { createOrder } from '../lib/orderHandler';
import toast,{Toaster} from 'react-hot-toast';
import { useStore } from '../store/store';
import {useRouter} from 'next/router';
export default function OrderModal({opened,setOpened,PaymentMethod}){
  const router =useRouter();
const total= typeof window != 'undefined' && localStorage.getItem('total');
  const theme = useMantineTheme();
const [FormData, setFormData] = useState(null);
const handleInput=(e)=>
{
    setFormData({...FormData,[e.target.name]:e.target.value})
}
const resetCart=useStore((state)=>state.resetCart)
const handleSubmit=async (e)=>
{
    e.preventDefault();
    const id = await createOrder({...FormData,total,PaymentMethod});
    toast.success("Order Placed Successfully");
    resetCart();
    {
        typeof window != 'undefined' && localStorage.setItem('order',id);
    }
    router.push(`/order/${id}`)
}
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={()=>setOpened(null)}
    >
      {/* Modal content */}
      <form action="" className={css.formContainer}>
        <input onChange={handleInput} type="text" name='name' placeholder='Name' required />
        <input onChange={handleInput} type="number" name='phone' placeholder='Phone Number' required/>
        {/* <textarea name="address"  rows={3}></textarea> */}
        <select onChange={handleInput} name="address" id="address" placeholder='Address' required>
            <option value="" disabled selected hidden>Address...</option>
            <option value="Academic Block">Academic Block</option>
            <option value="Girl's Hostel">Girl's Hostel</option>
            <option value="Boy's Hostel Block-1">Boy's Hostel Block-1</option>
            <option value="Boy's Hostel Block-2">Boy's Hostel Block-2</option>
            <option value="Boy's Hostel Block-3">Boy's Hostel Block-3</option>
        </select>
        <span>You will Pay <span>Rs. {total}</span> on delivery</span>
        <button onClick={handleSubmit} type='submit' className={css.btn}>Place Order</button>
      </form>
      <Toaster/>
    </Modal>
  );
}