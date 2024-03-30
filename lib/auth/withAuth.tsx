// import { NextPage } from 'next';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// type PageWithAuthProps = {
//     // Define any props you want to pass to the wrapped component
// };

// const withAuth = (WrappedComponent: NextPage<PageWithAuthProps>) => {
//     const Wrapper: NextPage<PageWithAuthProps> = (props) => {
//         const { data: session, status } = useSession();
//         const router = useRouter();
//         console.log("session", session);
//         useEffect(() => {
//             // If the user is not authenticated, redirect to the login page
//             if (status === 'loading') return; // Loading state, do nothing
//             // if (!session) router.replace('/login');
//         }, [session, status, router]);

//         // If the user is authenticated, render the wrapped component
//         if (session) {
//             return <WrappedComponent {...props} />;
//         }

//         // If the user is not authenticated, you can show a loading indicator or redirect to the login page
//         return null;
//     };

//     Wrapper.getInitialProps = async (ctx: any) => {
//         if (WrappedComponent.getInitialProps) {
//             return WrappedComponent.getInitialProps(ctx);
//         }
//         return {};
//     };

//     return Wrapper;
// };

// export default withAuth;
