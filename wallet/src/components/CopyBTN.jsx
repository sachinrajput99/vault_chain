/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React from "react";
import { useCallback, useState } from 'react';
import {  CheckOutlined,CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CopyBTN = ({ text, label }) => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(() => {
        if (copied) {
            return
        }
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }, [copied, text]);

    return (
        <Button type='default ' onClick={copy}>
            {
                copied ? <CheckOutlined style={{color:'green'}} /> : (label || <CopyOutlined />)
            }
        </Button>
    )
}

export default CopyBTN