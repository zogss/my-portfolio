'use server';

import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore';

import { firebaseApp } from '@/lib/firebase';
import { ContactFormDataType } from '@/schemas/contactSchema';

const saveContact = async (data: ContactFormDataType) => {
  const db = getFirestore(firebaseApp);

  const dataWithTimestamp = { ...data, createdAt: new Date() };
  const contactsRef = await addDoc(
    collection(db, 'contacts'),
    dataWithTimestamp,
  );
  await setDoc(contactsRef, dataWithTimestamp);
};

export default saveContact;
