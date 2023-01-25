import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

export async function handleFoundUserSelect(currentUser, user, db) {
  try {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid

    const res = await getDoc(doc(db, 'chats', combinedId))
    if (!res.exists()) {
      // create chat in chats collection
      await setDoc(doc(db, 'chats', combinedId), { messages: [] })

      // create user chats
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [`${combinedId}.userInfo`]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        [`${combinedId}.date`]: serverTimestamp()
      })

      await updateDoc(doc(db, 'userChats', user.uid), {
        [`${combinedId}.userInfo`]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },
        [`${combinedId}.date`]: serverTimestamp()
      })
    }
  } catch (e) {
    console.log(e)
  }
}