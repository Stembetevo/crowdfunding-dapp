'use client'
import React, { useState } from 'react'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { useCampaigns } from '../context/CampaignsContext';
import { useRouter } from 'next/navigation';
import { Campaign } from '../types/Campaign';

export default function CreateCampaign(){
   const {addCampaign} = useCampaigns();
   const router = useRouter();

    const [isLoading,setIsLoading] = useState(false);
    const [form,setForm] = useState<Campaign>({
        name:'',
        title:'',
        description:'',
        target:'',
        deadline:'',
        image:''
    });

    const handleFormFieldChange = (fieldName: any,e: { target: { value: any; }; }) => {
      setForm({...form, [fieldName]:e.target.value})
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      addCampaign(form);
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         router.push('/');
      },500);
     }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>{isLoading && 'Loader...'}
    <div className='flex justify-center items-center p-[16px]sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
            Start a Campaign
        </h1>
    </div>

    <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
      <div className='flex flex-wrap gap-[40px]'>
         <FormField 
            labelName = "Your Name"
            placeholder = "John Doe"
            inputType = "text"
            value = {form.name}
            handleChange = {(e) => handleFormFieldChange('name',e)}
         />
         
         <FormField 
            labelName = "Campaign title"
            placeholder = "Write a title"
            inputType = "text"
            value = {form.title}
            handleChange = {(e) => handleFormFieldChange('title',e)}
         />

         <FormField 
            labelName = "Story"
            placeholder = "Write your story"
            isTextArea
            value = {form.description}
            handleChange = {(e) => handleFormFieldChange('description',e)}
         />
        </div>
        <div className='flex flex-wrap gap-[40px]'>
            <FormField 
            labelName = "Goal"
            placeholder = "SUI 0.1"
            inputType='text'
            value = {form.target}
            handleChange = {(e) => handleFormFieldChange('target',e)}
         />

         <FormField 
            labelName = "End date"
            placeholder = "End date"
            inputType='date'
            value = {form.deadline}
            handleChange = {(e) => handleFormFieldChange('deadline',e)}
         />
        </div>
         
         <FormField 
            labelName = "Campaign Image"
            placeholder = "Place image url"
            inputType='url'
            value = {form.image}
            handleChange = {(e) => handleFormFieldChange('image',e)}
         />

         <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton 
          btnType='submit'
          title='Submit new campaign'
          styles='bg-[#1dc071]'
          />
         </div>
      
    </form>

    </div>
  )
}
