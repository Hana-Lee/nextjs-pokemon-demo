import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Image from 'next/image'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { PreviewData } from 'next/types'

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

interface PokemonDetailProps {
  pokemonDetail: PokemonDetail
}

interface Query extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<PokemonDetailProps, Query> = async (context: GetServerSidePropsContext<Query>): Promise<GetServerSidePropsResult<PokemonDetailProps>> => {
  const { params } = context
  const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params?.id}.json`)
  return {
    props: {
      pokemonDetail: await resp.json()
    }
  }
}

export default function Details({ pokemonDetail }: PokemonDetailProps) {
  return (
    <div>
      <Head>
        <title>{pokemonDetail.name}</title>
      </Head>
      <div>
        <Link href="/">Back to Home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img className={styles.picture} src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemonDetail.image}`} alt={pokemonDetail.name}/>
        </div>
        <div>
          <div className={styles.name}>{pokemonDetail.name}</div>
          <div className={styles.type}>{pokemonDetail.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
            </thead>
            {pokemonDetail.stats.map(({ name, value }) => (
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
