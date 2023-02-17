import React from "react";

export default class Menu {
// userauthority === 0의 사이드바(결재자)
    user0menu = [
        {
            index: "depth1-1",
            name: "전자 결재",
            path: "/main",
        }
    ];

// userauthority === 1의 사이드바(관리자)
    user1menu = [
        {
            index: "depth1-2",
            name: "사무용품 신청 관리",
            path: "/reqterm",
            menu2: [
                {
                    index: "depth2-1",
                    name: "신청기간 설정",
                    path: "/reqterm"
                },
                {
                    index: "depth2-2",
                    name: "신청 관리",
                    path: "/request"
                }
            ]
        },
        {
            index: "depth1-3",
            name: "전자결재",
            path: "/docrequest",
            menu2: [
                {
                    index: "depth2-3",
                    name: "전자 결재 작성",
                    path: "/docrequest"
                },
                {
                    index: "depth2-4",
                    name: "전자 결재 목록",
                    path: "/docpaylist"
                }
            ]
        },
        {
            index: "depth1-4",
            name: "사무용품 구매",
            path: "/orderreq",
            menu2: [
                {
                    index: "depth2-5",
                    name: "구매 신청",
                    path: "/orderreq"
                },
                {
                    index: "depth2-6",
                    name: "구매 진행 현황",
                    path: "/order"
                },
                // {
                //     index: "depth2-7",
                //     name: "과거 구매 신청",
                //     path: "/orderparchase"
                // }
            ]
        }
    ];

// userauthority === 2의 사이드바(사용자)
    user2menu = [
        {
            index: "depth1-5",
            name: "사무용품 구매",
            path: "/product",
            menu2: [
                {
                    index: "depth2-8",
                    name: "물품보기",
                    path: "/product"
                },
                {
                    index: "depth2-9",
                    name: "장바구니",
                    path: "/cart"
                }
            ]
        },
        {
            index: "depth1-6",
            name: "사무용품 신청 내역",
            path: "/requestuser"
        }
    ];
}