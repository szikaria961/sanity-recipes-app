import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Recipes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is Recipes App for my MOM</h1>
    </div>
  )
}

export default Home
