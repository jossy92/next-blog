import Head from 'next/head'
import Navbar from './Navbar';
import Footer from './Footer'

export default function Layout({ children} ) {
  return (
    <>
      <Head>
      
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      </Head>
      <Navbar />
        {children}
      <Footer />
    </>
      
  )
}
