import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { gql, useQuery } from '@apollo/client'

const GetMe = gql`
  query User($name: String!) {
     user(name: $name){
      id
      name
      avatar
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GetMe, {
    variables: { name: "Wade Martin"}
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <p className={styles.description}>
          My name is {data.user.name}
          </p>
      </main>
    </div>
  )
}
