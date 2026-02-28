import { Order } from '@/types';
export const mockOrders: Order[] = [
    {
        id: '1',
        order_no: '290405',
        order_status: 'delivered',
        created_at: '14 Aralık 2022 Tarihinde Sipariş Verildi',
        total_price: 770,
        shipping_fee: 0,
        cart_detail: [
            {
                id: 'i1',
                product_id: 1,
                product_variant_id: 'v1',
                product_name: 'MELATONIN x 2',
                pieces: 1,
                unit_price: 62,
                total_price: 62,
                variant_name: 'Boyut: 1 KUTU',
                photo: 'https://fe1111.projects.academy.onlyjs.com/uploads/products/melatonin.png'
            },
            {
                id: 'i2',
                product_id: 2,
                product_variant_id: 'v2',
                product_name: 'GÜNLÜK VİTAMİN PAKETİ x 1',
                pieces: 1,
                unit_price: 449,
                total_price: 449,
                variant_name: 'Boyut: 1 Paket x 2 Adet',
                photo: 'https://fe1111.projects.academy.onlyjs.com/uploads/products/vitamin.png'
            },
            {
                id: 'i3',
                product_id: 3,
                product_variant_id: 'v3',
                product_name: 'BROMELAIN x 1',
                pieces: 1,
                unit_price: 197,
                total_price: 197,
                variant_name: 'Boyut: 1 KUTU x 2 Adet',
                photo: 'https://fe1111.projects.academy.onlyjs.com/uploads/products/bromelain.png'
            }
        ],
        shipping_info: {
            company: 'hepsiJet',
            tracking_number: 'HJ2192904051'
        },
        address: {
            id: 'a1',
            title: 'İş Adresi',
            first_name: 'Uğur',
            last_name: 'İLTER',
            phone_number: '5551112233',
            full_address: 'Barbaros, Nidakule Ataşehir Batı, Begonya Sk. No: 1/2, 34746 Ataşehir/İstanbul'
        },
        price_summary: {
            subtotal: 856,
            shipping: 0,
            tax: 8,
            discount: 86,
            total: 770
        }
    },
    {
        id: '2',
        order_no: '427795',
        order_status: 'delivered',
        created_at: '31 Mart 2023 Tarihinde Sipariş Verildi',
        total_price: 369.90,
        shipping_fee: 20,
        cart_detail: [
            {
                id: 'i4',
                product_id: 4,
                product_variant_id: 'v4',
                product_name: 'DEEP SLEEP',
                pieces: 1,
                unit_price: 349.90,
                total_price: 349.90,
                variant_name: 'Boyut: 1 KUTU',
                photo: 'https://fe1111.projects.academy.onlyjs.com/uploads/products/deep-sleep.png'
            }
        ],
        shipping_info: {
            company: 'Yurtiçi Kargo',
            tracking_number: 'YK928471924'
        },
        address: {
            id: 'a1',
            title: 'Ev Adresi',
            first_name: 'Uğur',
            last_name: 'İLTER',
            phone_number: '5551112233',
            full_address: 'Barbaros, Nidakule Ataşehir Batı, Begonya Sk. No: 1/2, 34746 Ataşehir/İstanbul'
        },
        price_summary: {
            subtotal: 349.90,
            shipping: 20,
            tax: 5,
            discount: 0,
            total: 369.90
        }
    }
];
