
// @ts-nocheck
import React, {useEffect, useState} from 'react'
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

const NumberDemo = (props: {
  value: number
}) => {
  const { value } = props
  const [animation, setAnimation] = useState<any>(null)
  useEffect(()=>{
    onClick()
  }, [value])

  const onClick = () => {
    setAnimation({
      Children: {
        value, 
        floatLength: 0,
        formatMoney: false,
      },
      duration: 1000,
    })
  }

  return (
    <TweenOne
      animation={animation}
      style={{fontSize: 32}}
    >
      0
    </TweenOne>
  )
}

export default NumberDemo