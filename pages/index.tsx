import Head from 'next/head'
import Image from 'next/image'
import { stringify } from 'querystring'
import { PropsWithoutRef, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export interface Pokemon {
  id: number
  name: string
  image: string
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

  useEffect(() => {
    async function getPokemonList() {
      const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
      setPokemonList(await resp.json())
    }
    getPokemonList().catch(console.error)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemonList.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name}/>
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
