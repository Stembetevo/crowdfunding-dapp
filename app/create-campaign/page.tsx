'use client'
import React, { useState } from 'react'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import { useCampaigns } from '../context/CampaignsContext';
import { useRouter } from 'next/navigation';
import { Campaign } from '../types/Campaign';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Heading } from 'lucide-react';
import { Transaction } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { PACKAGE_ID } from '@/constants/constant';

const CLOCK_OBJECT_ID = "0x6";

const CreateCampaign = () => {
   
   const { mutate: execCreateCampaign } = useSignAndExecuteTransaction();

   const {addCampaign} = useCampaigns();
   const router = useRouter();
   const currentAccount = useCurrentAccount();

    const [isLoading,setIsLoading] = useState(false);
    const [form,setForm] = useState<Campaign>({
        id:'',
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
        setIsLoading(true);

        // Convert deadline to timestamp (u64)
        const deadlineTimestamp = new Date(form.deadline).getTime();

        const txb = new Transaction();
        txb.moveCall({
          target: `${PACKAGE_ID}::crowdfunding::create_campaign`,
          arguments: [
            txb.pure.string(form.title),
            txb.pure.string(form.description),
            txb.pure.u64(form.target),
            txb.pure.u64(Number(deadlineTimestamp)),
            txb.pure.string(form.image),
            txb.object(CLOCK_OBJECT_ID)
          ],
        });

        execCreateCampaign(
          { transaction: txb },
          {
            onError: (err) => {
              console.error('Transaction failed:', err);
              alert('Error creating campaign: ' + err.message);
              setIsLoading(false);
            },
            onSuccess: (result) => {
              console.log('Transaction successful:', result);
              const campaignId = result.digest;
              
              // Only add to local state after successful blockchain transaction
              addCampaign({
                ...form,
                id: campaignId,
                transactionDigest: campaignId, // Store digest explicitly
                createdAt: new Date().toISOString(), // Add timestamp
                owner: currentAccount?.address || '', // Add owner info
                amountRaised: '0', // Initialize with 0 funds raised
                contributors: 0 
                 // Use transaction digest as ID or extract from result
              });
              
              
              setTimeout(() => {
                setIsLoading(false);
                router.push('/');
              }, 1000);
            },
          }
        );
    }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && 'Loader...'}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
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
              inputType='number'
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
            {currentAccount ? (
              <div className='flex justify-center items-center mt-[40px]'>
             
            <CustomButton 
            btnType='submit'
            title='Submit new campaign'
            styles='bg-[#1dc071]'
            />
           </div>
            ):(
             <ConnectButton />
            )}
        </form>
    </div>
  )
}

export default CreateCampaign;