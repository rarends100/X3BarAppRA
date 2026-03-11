

const RootNavigator = () => {
  const isAdmin = useContext(isAdminContext);
  const isLoggedIn = useContext(isLoggedInContext);
  const isTrainee = useContext(isTraineeContext);
  
  const Stack = createNativeStackNavigator();
  
  return (
   
  );
};