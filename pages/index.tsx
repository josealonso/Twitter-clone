import type { NextPage } from 'next'
import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'


const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <title>Twitter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        {/* Feed  */}
        {/* Widgets */}
        {/* Modal */}
      </main>
    </>
  )
}

export default Home
