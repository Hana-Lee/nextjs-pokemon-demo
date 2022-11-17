import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Image from 'next/image'

interface PokemonStat {
  name: string
  value: number
}

interface PokemonDetail {
  name: string
  type: string[]
  stats: PokemonStat[]
  image: string
}

export default function Details() {
  const { query: { id } } = useRouter()

  const [pokemon, setPokemon] = useState<PokemonDetail>()

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
      setPokemon(await resp.json())
    }
    if (id) getPokemon().catch(console.error)
  }, [id])

  if (!pokemon) return null

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img className={styles.picture} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name}/>
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
            </thead>
            {pokemon.stats.map(({ name, value }) => (
              <tr key={name}>
                <td className={styles.attribute}>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  )
}
