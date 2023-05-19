import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { Range } from '../../stores/useSelectStore'
import { useAjax } from '../../api/ajax'
import { time } from '../../lib/time'
import { ItemsSummary } from './ItemsSummary'
import { ItemsList } from './ItemsList'

type Props = {
  kind: Range
}

export const Item: React.FC<Props> = (props) => {
  const { kind } = props
  const [after, setAfter] = useState('')
  const [before, setBefore] = useState('')
  const [Itemafter, setItemAfter] = useState('')
  const [Itembefore, setItemBefore] = useState('')
  const { get } = useAjax()
  function getItem(pageIndex: number, prev: Resources<Item>) {
    if (prev) {
      const sendCount = prev.pager.page * prev.pager.per_page
      if (sendCount > prev.pager.count) return null
    }
    return `/api/v1/items?page=${pageIndex + 1
      }&happened_after=${Itemafter}&happened_before=${Itembefore}`
  }

  const { data, error, size, setSize, isLoading, isValidating }
    = useSWRInfinite(
      getItem,
      async (path) => (await get<Resources<Item>>(path)).data,
      { revalidateFirstPage: false, revalidateAll: true }
    )

  const { data: balanceData, isLoading: balanceLoading, error: balanceError } = useSWR(
    `/api/v1/items/balance?happened_after=${after}&happened_before=${before}`,
    async (path) =>
      (
        await get<{
          income: number
          expenses: number
          balance: number
        }>(path)
      ).data
  )

  useEffect(() => {
    switch (kind) {
      case 'lastMonth':
        setAfter(time().vorvorigenMonat.format())
        setBefore(time().firstMonth.format())
        setItemAfter(new Date(time().vorvorigenMonat.timestamp).toISOString())
        setItemBefore(new Date(time().firstMonth.timestamp).toISOString())
        break
      case 'thisYear':
        setAfter(time().thisYear.format())
        setBefore(time().thisYearLastMonthDay.format())
        setItemAfter(new Date(time().thisYear.timestamp).toISOString())
        setItemBefore(
          new Date(time().thisYearLastMonthDay.timestamp).toISOString()
        )
        break
      case 'afterYear':
        setAfter(time().afterYear.format())
        setBefore(time().thisYear.format())
        setItemAfter(new Date(time().afterYear.timestamp).toISOString())
        setItemBefore(new Date(time().thisYear.timestamp).toISOString())
        break
      default:
        setAfter(time().firstMonth.format())
        setBefore(time().firstDayOfMonth.format())
        setItemAfter(new Date(time().firstMonth.timestamp).toISOString())
        setItemBefore(new Date(time().firstDayOfMonth.timestamp).toISOString())
        break
    }
  }, [kind])
  function onLoadMore() {
    setSize(size + 1)
  }
  return (
    <>
      <ItemsSummary data={balanceData} error={balanceError} isLoading={balanceLoading} />
      <ItemsList
        data={data}
        error={error}
        isLoading={isLoading}
        isValidating={isValidating}
        onLoadMore={onLoadMore}
      />
    </>
  )
}
