import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export interface Pokemon {
  id: number
  name: string
  image: string
}

interface PokemonListProps {
  pokemonList: Pokemon[]
}

export const getServerSideProps: GetServerSideProps<PokemonListProps> = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PokemonListProps>> => {
  const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json')
  return {
    props: {
      pokemonList: await resp.json(),
    },
  }
}

export default function Home({ pokemonList }: PokemonListProps) {
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
