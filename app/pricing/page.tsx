'use client'

import { motion } from 'framer-motion'

export default function PricingPage() {
    const plans = [
        {
            name: 'Starter',
            price: '$9',
            period: '/month',
            features: [
                'Up to 5 projects',
                'Basic analytics',
                'Email support',
                'Community access'
            ]
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            features: [
                'Unlimited projects',
                'Advanced analytics',
                'Priority support',
                'API access',
                'Custom integrations'
            ],
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            features: [
                'Everything in Pro',
                'Dedicated support',
                'Custom solutions',
                'SLA guarantee',
                'On-premise options'
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Choose the plan that's right for you. All plans include a 14-day free trial.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-8 rounded-xl border ${plan.popular
                                    ? 'border-indigo-500 bg-gradient-to-b from-indigo-500/10 to-transparent'
                                    : 'border-white/10 bg-black/30'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-tl-xl rounded-br-xl">
                                    Popular
                                </div>
                            )}
                            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-white/60">{plan.period}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-white/80">
                                        <svg
                                            className="w-5 h-5 mr-2 text-indigo-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 rounded-lg font-medium transition-colors ${plan.popular
                                        ? 'bg-indigo-500 hover:bg-indigo-600'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
} 