import React from "react";
import { type Breed } from "../features/breeds";
import * as Flags from "country-flag-icons/react/3x2";

export function BreedsTable({ breeds }: { breeds: Breed[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                    <th className="px-4 py-3">Breed</th>
                    <th className="px-4 py-3">Origin</th>
                    <th className="px-4 py-3">Temperament</th>
                    <th className="px-4 py-3">Life Span</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {breeds.map((breed) => {
                    const Code = breed.country_code.toUpperCase();
                    const Flag = (Flags as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[Code];

                    return (
                        <tr key={breed.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 font-medium text-gray-900">{breed.name}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                {breed.origin}
                                {Flag && <Flag className="w-5 h-3" />}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{breed.temperament}</td>
                            <td className="px-4 py-3 text-gray-600">{breed.life_span} yrs</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
