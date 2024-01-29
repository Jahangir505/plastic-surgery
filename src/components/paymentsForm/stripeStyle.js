
import { css } from "@emotion/css";

export const useStripeStyle = () => ({
    root: css `

        padding: 20px;
        
        @media(max-width: 500px){
            padding: 10px 0;
        }

        .FormGroup {
            margin: 0 15px 20px;
            padding: 0;
            border-style: none;
            background-color: transparent;
            will-change: opacity, transform;
            box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 0px 0 #829fff;
            border-radius: 4px;

            @media(max-width: 500px){
                margin: 0;
            }

            .FormRow {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                margin-left: 15px;

                .StripeElement--webkit-autofill {
                    background: transparent !important;
                }

                .StripeElement {
                    width: 100%;
                    padding: 11px 15px 11px 0;
                }
            }
        }

        button {
            display: block;
            font-size: 16px;
            width: calc(100% - 30px);
            height: 40px;
            margin: 10px 15px 0;
            background-color: #800000;
            box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #800000;
            border-radius: 4px;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
            transition: all 100ms ease-in-out;
            will-change: transform, background-color, box-shadow;
            border: none;

            :active {
                background-color: #d782d9;
                box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #e298d8;
                transform: scale(0.99);
            }
        }
    
    
    
    `,
});